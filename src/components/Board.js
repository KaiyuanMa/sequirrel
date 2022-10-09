import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  getConnectedEdges,
  useReactFlow,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { getDataSetEdges } from "../api/edge";
import { getDataSetNode } from "../api/node";
import {
  addModelAC,
  setModelsAC,
  deleteModelAC,
  addModelEntry,
  setDataSetAC,
} from "../state/actionCreators/modelsAC";
import { apiAddModel } from "../api/model";
import { apiAddNode, apiDeleteNode, apiUpdateNode } from "../api/node";
import { apiAddEdge, apiDeleteEdgeByNode, apiDeleteEdge } from "../api/edge";

import ModelNode from "./ModelNode";
import ModelEdge from "./ModelEdge";
import MapTool from "./MapTool";

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

  const deleteNode = (node) => {
    onNodesChange([{ id: node.id, type: "remove" }]);
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
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [dataSet]);

  useEffect(() => {
    if (dataSet.id) {
      fetchData();
    }
  }, [models]);

  //TODO: useCallback ?, check documentation
  const addModelHandelClick = (name) => {
    const helper = async () => {
      const { data } = await apiAddModel({
        name: name,
        dataSetId: DataSetId,
      });
      dispatch(addModelAC(data));
      const response = await apiAddNode({
        modelId: data.id,
        dataSetId: DataSetId,
        positionX: newX,
        positionY: newY,
        type: "model",
      });
      const node = response.data;
      const curr = {};
      curr.id = node.id;
      curr.type = node.type;
      curr.position = { x: newX, y: newY };
      curr.data = { modelId: node.modelId, deleteNode };
      curr.dragHandle = ".model-node-header";
      setNodes((nds) => nds.concat(curr));
      dispatch(
        addModelEntry({
          modelId: data.id,
          name: "id",
          autoIncrement: true,
          type: "Sequelize.INTEGER",
          primaryKey: true,
        })
      );
    };
    helper();
    setNewX(newX + 10);
    setNewY(newY + 10);
  };

  const onNodesChange = useCallback((changes) => {
    setNodes((ns) => applyNodeChanges(changes, ns));
  }, []);

  const onEdgesChange = useCallback((changes) => {
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

  //
  const onNodesDelete = (nodes) => {
    const deleteNodeAndModel = async (node) => {
      await apiDeleteNode(node.data.modelId);
      dispatch(deleteModelAC(node.data.modelId));
    };
    for (let node of nodes) {
      deleteNodeAndModel(node);
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
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
        {/* <Background variant="dots" gap={20} /> */}
        <MapTool addModelHandelClick={addModelHandelClick} />
      </ReactFlow>
    </div>
  ) : null;
}

export default Flow;
