import React from "react";
import GenerateFile from "./GenerateFile";
import { useDispatch, useSelector } from "react-redux";

function MapTool(props) {
  const { dataSet } = useSelector((state) => state.dataSet);
  const showMapTool = () => {
    const map_tool = document.querySelector(".map-tool-wrapper");
    const map_tool_btn = document.querySelector(".map-tool-show-btn");
    map_tool?.classList?.toggle("map-tool-wrapper-deActive");
    map_tool_btn?.classList?.toggle("map-tool-show-btn-active");
  };
  return dataSet.id ? (
    <div className="map-tool-wrapper">
      <div className="map-tool">
        <button
          className="add_model map-tool-btn"
          onClick={() => {
            props.addModelHandelClick("New Model");
          }}
        >
          +
        </button>
        <GenerateFile />
      </div>
      <button className="map-tool-show-btn" onClick={showMapTool}>
        <span className="fa fa-hand-o-up" />
      </button>
    </div>
  ) : null;
}

export default MapTool;
