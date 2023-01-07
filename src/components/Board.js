import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  useReactFlow,
  getConnectedEdges,
} from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { getDataSetEdges } from "../api/edge";
import { getDataSetNode } from "../api/node";
import {
  addModelAC,
  setModelsAC,
  deleteModelAC,
  addModelEntry,
} from "../state/actionCreators/modelsAC";
import { apiAddModel } from "../api/model";
import { apiAddNode, apiDeleteNode, apiUpdateNode } from "../api/node";
import { apiAddEdge, apiDeleteEdgeByNode, apiDeleteEdge } from "../api/edge";
import ModelNode from "./ModelNode";
import ModelEdge from "./ModelEdge";
import MapTool from "./MapTool";
import "reactflow/dist/style.css";

const rfStyle = {
  backgroundColor: "#181818",
};

const nodeTypes = { model: ModelNode };
const edgeTypes = { modelEdge: ModelEdge };

function Flow() {
  const { dataSet } = useSelector((state) => state.dataSet);
  const { models } = useSelector((state) => state.models);
  const { auth } = useSelector((state) => state.auth);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [newX, setNewX] = useState(200);
  const [newY, setNewY] = useState(200);
  const defaultEdgeOptions = { animated: true };
  const dispatch = useDispatch();
  const DataSetId = dataSet.id;
  const { deleteElements } = useReactFlow();

  const deleteNode = (node) => {
    deleteElements({ node: [node] });
    // onNodesChange([{ id: node.id, type: "remove" }]);
    //TODO: delete edges when deleting node on custom delete function
    // const currEdges = getConnectedEdges(
    //   [nodes.find((currNode) => currNode.id == node.id)],
    //   edges
    // );
    // console.log(currEdges);
    // for (let edge of currEdges) {
    //   setEdges((oldEdges) => {
    //     oldEdges.filter((curEdge) => curEdge.id != edge.id);
    //   });
    // }
  };

  const fetchData = async () => {
    const nodeResponse = await getDataSetNode(DataSetId);
    const nodeDummy = [];
    if (nodeResponse.data.length > 0) {
      for (let node of nodeResponse.data) {
        const curr = {};
        curr.id = node.id;
        curr.type = node.type;
        curr.dragHandle = ".model-node-header";
        curr.position = { x: node.positionX, y: node.positionY };
        curr.data = { modelId: node.modelId, deleteNode };
        nodeDummy.push(curr);
      }
    }
    const response = await getDataSetEdges(DataSetId);
    const edgeDummy = [];
    if (response.data.length > 0) {
      for (let edge of response.data) {
        edge.markerEnd = {
          type: MarkerType.ArrowClosed,
        };
        edgeDummy.push(edge);
      }
    }
    setNodes(nodeDummy);
    setEdges(edgeDummy);
  };

  useEffect(() => {
    if (!auth.id) {
      setNodes([]);
      setEdges([]);
    }
  }, [auth]);

  useEffect(() => {
    if (dataSet.id) {
      fetchData();
      dispatch(setModelsAC(DataSetId));
    }
  }, [dataSet]);

  useEffect(() => {
    if (dataSet.id) {
      fetchData();
    }
  }, [models]);

  //TODO: useCallback ?, check documentation
  const addModelHandelClick = async (name) => {
    const modelId = uuidv4();
    const currModel = {
      id: modelId,
      name: name,
      dataSetId: DataSetId,
    };
    const currNode = {
      modelId: modelId,
      dataSetId: DataSetId,
      positionX: newX,
      positionY: newY,
      type: "model",
    };
    const currEntry = {
      modelId: modelId,
      name: "id",
      autoIncrement: true,
      type: "Sequelize.INTEGER",
      primaryKey: true,
    };
    await apiAddModel(currModel);
    await apiAddNode(currNode);
    dispatch(addModelEntry(currEntry));
    dispatch(addModelAC(currModel));
    setNewX(newX + 10);
    setNewY(newY + 10);
  };

  const onNodesChange = useCallback((changes) => {
    console.log(1);
    setNodes((ns) => applyNodeChanges(changes, ns));
  }, []);
  const onEdgesChange = useCallback((changes) => {
    console.log(1);
    setEdges((es) => applyEdgeChanges(changes, es));
    const deleteEdgeByNodes = async (changeId) => {
      const idA = changeId.slice(16, 52);
      const idB = changeId.slice(53, 89);
      await apiDeleteEdgeByNode(idA, idB);
    };
    const deleteEdgeId = async (id) => {
      await apiDeleteEdge(id);
    };
    for (let change of changes) {
      if (change.type == "remove") {
        if (change.id.length == 36) {
          deleteEdgeId(change.id);
        } else deleteEdgeByNodes(change.id);
      }
    }
  }, []);

  const onConnect = (connection) => {
    connection.type = "modelEdge";
    connection.markerEnd = {
      type: MarkerType.ArrowClosed,
    };
    setEdges((eds) => addEdge(connection, eds));
    const addEdgeHelper = async () => {
      connection.dataSetId = DataSetId;
      connection.label = "hasMany";
      await apiAddEdge(connection);
    };
    addEdgeHelper();
  };

  const onNodesDelete = (nodes) => {
    const deleteNodeAndModel = async (node) => {
      await apiDeleteNode(node.data.modelId);
      dispatch(deleteModelAC(node.data.modelId));
    };
    for (let node of nodes) {
      deleteNodeAndModel(node);
    }
  };

  const onEdgesDelete = (edges) => {
    const deleteEdge = async (edge) => {
      console.log(1);
      await apiDeleteEdge(edge.id);
    };
    for (let edge of edges) {
      deleteEdge(edge);
    }
  };

  const onNodeDragStop = (event, node, nodes) => {
    const updateNode = async () => {
      await apiUpdateNode(node.data.modelId, {
        positionX: Math.round(node.position.x),
        positionY: Math.round(node.position.y),
      });
    };
    updateNode();
  };

  return nodes ? (
    <div className="react-flow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onEdgesDelete={onEdgesDelete}
        onNodesChange={onNodesChange}
        // onNodesDelete={onNodesDelete}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        style={rfStyle}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <MiniMap nodeColor="#202020" />
        <Controls />
        <Background variant="dots" gap={20} />
        <MapTool addModelHandelClick={addModelHandelClick} />
      </ReactFlow>
    </div>
  ) : null;
}

export default Flow;
