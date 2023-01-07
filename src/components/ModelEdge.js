import React, { useEffect } from "react";
import { getBezierPath, getEdgeCenter } from "reactflow";
import { apiUpdateEdge } from "../api/edge";

function ModelEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  label,
  markerEnd,
}) {
  const foreignObjectSize = 150;
  const [path, edgeCenterX, edgeCenterY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  // const [edgeCenterX, edgeCenterY] = getEdgeCenter({
  //   sourceX,
  //   sourceY,
  //   targetX,
  //   targetY,
  // });

  const inputHelper = () => {
    const relationSelectWrapper = document.getElementById(
      `${id}-select-wrapper`
    );
    const relationSelect = document.getElementById(`${id}-select`);
    relationSelectWrapper?.addEventListener("dblclick", function () {
      relationSelect.disabled = false;
      relationSelect.focus();
    });
    relationSelect?.addEventListener("blur", function () {
      relationSelect.disabled = true;
    });
  };

  const updateRelationship = async (value) => {
    await apiUpdateEdge(id, { label: value });
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={path}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="model-edge-foreign-object"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="model-edge-wrapper" id={`${id}-select-wrapper`}>
          <select
            onChange={(e) => updateRelationship(e.target.value)}
            id={`${id}-select`}
            className="model-edge-select"
          >
            <option value="hasMany" selected={label == "hasMany"}>
              hasMany
            </option>
            <option value="hasOne" selected={label == "hasOne"}>
              hasOne
            </option>
            <option value="belongsTo" selected={label == "belongsTo"}>
              belongsTo
            </option>
            <option value="belongsToMany" selected={label == "belongsToMany"}>
              belongsToMany
            </option>
          </select>
        </div>
      </foreignObject>
    </>
  );
}

export default ModelEdge;
