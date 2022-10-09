import React, { useCallback, useEffect, useState, useRef } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import ModelAttribute from "./ModelAttribute";
import {
  addModelEntry,
  editModelAC,
  deleteModelAC,
} from "../state/actionCreators/modelsAC";
import { apiDeleteModel } from "../api/model";
import { apiDeleteNode } from "../api/node";

function ModelNode(props) {
  const dispatch = useDispatch();
  const { models } = useSelector((state) => state.models);
  const [model, setModel] = useState({});
  const [modelName, _setModelName] = useState("");
  const modelNameRef = useRef(modelName);
  const setModelName = (data) => {
    modelNameRef.current = data;
    _setModelName(data);
  };
  const data = props.data;
  const modelId = data.modelId;
  console.log(data);

  useEffect(() => {
    const currModel = models.find((model) => model.id == modelId);
    setModel(currModel);
    setModelName(currModel.name);
    inputHelper();
  }, [props]);

  const handelClick = () => {
    dispatch(addModelEntry({ modelId: modelId }));
  };

  const inputHelper = () => {
    const modelForm = document.getElementById(`${modelId}-form`);
    const modelInput = document.getElementById(`${modelId}-input`);
    modelForm?.addEventListener("dblclick", function () {
      modelInput.disabled = false;
      modelInput.focus();
    });
    modelInput?.addEventListener("blur", function () {
      modelInput.disabled = true;
      updateModelName();
    });
    modelInput?.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 13) {
        modelInput.disabled = true;
      }
    });
  };

  const updateModelName = () => {
    dispatch(editModelAC(modelId, { name: modelNameRef.current }));
  };

  const handelSubmit = (ev) => {
    ev.preventDefault();
    updateModelName();
  };

  const handelDelete = () => {
    const deleteNodeAndModel = async (data) => {
      await apiDeleteNode(data.modelId);
      dispatch(deleteModelAC(data.modelId));
    };
    deleteNodeAndModel(data);
    data.deleteNode(props);
  };

  return model ? (
    <div className="model-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <div className="model-node-header">
          <button onClick={handelDelete} className="x-button">
            <span className="fa fa-times x-mark"></span>
          </button>
        </div>
        <p className="subtitle-small">Model Name</p>
        <form
          className="model-name-form"
          id={`${modelId}-form`}
          onSubmit={handelSubmit}
        >
          <input
            type="text"
            className="model-name-input"
            id={`${modelId}-input`}
            placeholder={model.name}
            value={modelName}
            disabled={true}
            onChange={(ev) => setModelName(ev.target.value)}
          />
        </form>
        <div className="model-node-attribute-list">
          {model.entries
            ? model.entries.map((entry) => (
                <ModelAttribute entry={entry} key={entry.id} />
              ))
            : null}
        </div>
        <button
          onClick={() => {
            handelClick();
          }}
          className="square-btn add-attribute-btn"
        >
          <span className="fa fa-plus-square add-attribute-icon"></span>
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ) : null;
}

export default ModelNode;
