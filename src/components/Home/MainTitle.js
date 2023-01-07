import React, { useCallback } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState } from "reactflow";

const maiPageNodeStyle = {
  background: "#202020",
  color: "#FFFFFF",
  border: "1px solid #FFFFFF",
  width: 180,
};

const screenWidth = window.innerWidth;
const initialNodes = [
  {
    id: "main-title-node-1",
    data: {
      label: <>User</>,
    },
    position: { x: screenWidth / 2 - 550, y: 165 },
    style: maiPageNodeStyle,
  },
  {
    id: "main-title-node-2",
    data: {
      label: <>Order</>,
    },
    position: { x: screenWidth / 2 - 650, y: 305 },
    style: maiPageNodeStyle,
  },
  {
    id: "main-title-node-3",
    data: {
      label: <>Address</>,
    },
    position: { x: screenWidth / 2 - 450, y: 305 },
    style: maiPageNodeStyle,
  },
  {
    id: "main-title-node-4",
    data: {
      label: <>Nut</>,
    },
    position: { x: screenWidth / 2 + 300, y: 165 },
    style: maiPageNodeStyle,
  },
  {
    id: "main-title-node-5",
    data: {
      label: <>Squirrel</>,
    },
    position: { x: screenWidth / 2 + 300, y: 305 },
    style: maiPageNodeStyle,
  },
];

const initialEdges = [
  {
    id: "main-title-edge-1",
    source: "main-title-node-1",
    target: "main-title-node-2",
    animated: true,
    label: "hasMany",
  },
  {
    id: "main-title-edge-2",
    source: "main-title-node-1",
    target: "main-title-node-3",
    animated: true,
    label: "hasOne",
  },
  {
    id: "main-title-edge-3",
    source: "main-title-node-4",
    target: "main-title-node-5",
    animated: true,
    label: "belongsTo",
  },
];

function MainTitle() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const rfStyle = {
    backgroundColor: "#181818",
  };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="main-title-wrapper">
      <div className="main-title">
        <div className="main-title-text">Map Your Thoughts With</div>
        <div className="main-title-sequirrel-IPA">/'sikwəl/</div>
        <div className="main-title-sequirrel">Sequirrel</div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultViewport={{ x: 0, y: 0, zoom: -2 }}
        style={rfStyle}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        zoomOnScroll={false}
      >
        <Background variant="dots" gap={20} />
      </ReactFlow>
    </div>
  );
}

export default MainTitle;
