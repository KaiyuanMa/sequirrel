import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteModelEntry,
  updateModelEntryAC,
} from "../state/actionCreators/modelsAC";
import ModelValidationList from "./ModelValidationList";
import ModelAttributeBtnGroup from "./ModelAttributeBtnGroup";

function ModelAttribute(prop) {
  const { models } = useSelector((state) => state.models);
  const dispatch = useDispatch();
  const entry = prop.entry;
  const modelId = entry.modelId;
  const entryId = entry.id;
  const [name, _setName] = useState(entry.name);
  const nameRef = useRef(name);
  const setName = (data) => {
    nameRef.current = data;
    _setName(data);
  };

  const [type, _setType] = useState(entry.type);
  const typeRef = useRef(type);
  const setType = (data) => {
    typeRef.current = data;
    _setType(data);
  };

  const [defaultValue, _setDefaultValue] = useState(entry.defaultValue);
  const defaultValueRef = useRef(defaultValue);
  const setDefaultValue = (data) => {
    defaultValueRef.current = data;
    _setDefaultValue(data);
  };

  const inputHelper = (from, input) => {
    const entryForm = document.getElementById(`${entryId}-${from}`);
    const entryInput = document.getElementById(`${entryId}-${input}`);
    entryForm?.addEventListener("dblclick", function () {
      entryInput.disabled = false;
      entryInput.focus();
    });
    entryInput?.addEventListener("blur", function () {
      entryInput.disabled = true;
      updateEntry(input);
    });
    entryInput?.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 13) {
        entryInput.disabled = true;
      }
    });
  };

  const updateEntry = (property) => {
    if (property == "input")
      dispatch(updateModelEntryAC(modelId, entryId, { name: nameRef.current }));
    else if (property == "type")
      dispatch(updateModelEntryAC(modelId, entryId, { type: typeRef.current }));
    else if (property == "defaultValue")
      dispatch(
        updateModelEntryAC(modelId, entryId, {
          defaultValue: defaultValueRef.current,
        })
      );
  };

  const showEntryContent = () => {
    // const entryBtn = document.getElementById(`${entryId}-btn`);
    const entryContent = document.getElementById(`${entryId}-content`);
    const btnIcon = document.getElementById(`${entryId}-btn-icon`);
    const plusIcon = document.getElementById(
      `${entry.id}-validation-plus-icon`
    );
    const minusIcon = document.getElementById(
      `${entry.id}-validation-minus-icon`
    );
    const validationList = document.getElementById(
      `${entry.id}-validation-list`
    );
    const validationBtn = document.getElementById(
      `${entry.id}-validation-list-show-btn`
    );
    if (
      validationBtn?.classList?.contains("model-validation-list-btn-active")
    ) {
      validationBtn?.classList?.toggle("model-validation-list-btn-active");
      plusIcon?.classList?.toggle("hidden");
      minusIcon?.classList?.toggle("hidden");
      validationList?.classList?.toggle("model-validation-float-window-active");
    }
    btnIcon?.classList?.toggle("show-btn-icon-active");
    if (btnIcon?.classList?.contains("show-btn-icon-active")) {
      entryContent.style.maxHeight = entryContent.scrollHeight + "px";
    } else {
      entryContent.style.maxHeight = "0rem";
      entryContent.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    inputHelper("input-form", "input");
    inputHelper("type-form", "type");
    inputHelper("defaultValue-form", "defaultValue");
  }, []);

  useEffect(() => {
    const entryBtn = document.getElementById(`${entryId}-btn`);
    const entryContent = document.getElementById(`${entryId}-content`);
    if (entryBtn?.classList?.contains("model-attribute-expand-btn-active")) {
      entryContent.style.maxHeight = entryContent.scrollHeight + "px";
    }
  }, [prop, models]);

  return (
    <div className="model-attribute-wrapper">
      <div className="model-attribute-header">
        <div className="model-attribute-header-content">
          <div>
            <p className="subtitle-small">Entry Name</p>
            <form
              id={`${entryId}-input-form`}
              className="model-attribute-header-content-form"
            >
              <input
                value={name}
                placeholder="name"
                id={`${entryId}-input`}
                onChange={(e) => setName(e.target.value)}
                disabled={true}
                className="model-attribute-header-content-input"
              />
            </form>
          </div>
          <div>
            <p className="subtitle-small">Type</p>
            <form id={`${entryId}-type-form`} className="model-type-form">
              <input
                value={type}
                placeholder="Enter or select type"
                id={`${entryId}-type`}
                onChange={(e) => setType(e.target.value)}
                disabled={true}
                className="model-type-input"
              ></input>
              <select
                onChange={(e) => {
                  setType(e.target.value);
                  updateEntry("type");
                }}
                className="model-type-select"
              >
                <option defaultChecked></option>
                <option value="Sequelize.STRING">Sequelize.STRING</option>
                <option value="Sequelize.TEXT">Sequelize.TEXT</option>
                <option value="Sequelize.BOOLEAN">Sequelize.BOOLEAN</option>
                <option value="Sequelize.INTEGER">Sequelize.INTEGER</option>
                <option value="Sequelize.UUID">Sequelize.UUID</option>
                <option value="Sequelize.JSON">Sequelize.JSON</option>
                <option value="Sequelize.STRING(100)">
                  Sequelize.STRING(100)
                </option>
                <option value="Sequelize.STRING.BINARY">
                  Sequelize.STRING.BINARY
                </option>
                <option value="Sequelize.CHAR">Sequelize.CHAR</option>
                <option value="Sequelize.CHAR(100)">Sequelize.CHAR(100)</option>
                <option value="Sequelize.CHAR.BINARY">
                  Sequelize.CHAR.BINARY
                </option>
                <option value="Sequelize.CITEXT">Sequelize.CITEXT</option>
                <option value="Sequelize.TSVECTOR">Sequelize.TSVECTOR</option>
                <option value="Sequelize.SMALLINT">Sequelize.SMALLINT</option>
                <option value="Sequelize.BIGINT">Sequelize.BIGINT</option>
                <option value="Sequelize.JSONB">Sequelize.JSONB</option>
              </select>
            </form>
          </div>
          <ModelAttributeBtnGroup entry={entry} />
        </div>
        <div className="model-attribute-btn-wrapper">
          <button
            className="model-attribute-expand-btn circle-btn"
            id={`${entryId}-btn`}
            onClick={showEntryContent}
          >
            <span
              id={`${entryId}-btn-icon`}
              className="fa fa-chevron-circle-down show-btn-icon"
            ></span>
          </button>
          <button
            onClick={() => dispatch(deleteModelEntry(modelId, entryId))}
            className="model-attribute-delete-btn circle-btn"
          >
            <span className="fa fa-times-circle"></span>
          </button>
        </div>
      </div>
      <div className="model-attribute-content" id={`${entryId}-content`}>
        <div className="model-validation-header">
          <p className="subtitle-small">Name</p>
          <p className="subtitle-small params-label">Params</p>
        </div>
        <div className="model-validation-list-item">
          <div className="model-validation-label">DefaultValue</div>
          <form
            id={`${entryId}-defaultValue-form`}
            className="model-validation-form"
          >
            <input
              value={defaultValue}
              id={`${entryId}-defaultValue`}
              onChange={(e) => setDefaultValue(e.target.value)}
              disabled={true}
              placeholder="Please enter in JS format"
              className="model-validation-input"
            />
          </form>
        </div>
        <ModelValidationList entry={entry} />
      </div>
    </div>
  );
}

export default ModelAttribute;
