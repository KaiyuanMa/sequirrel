import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateValidation } from "../state/actionCreators/modelsAC";

function ModelValidation(prop) {
  const dispatch = useDispatch();
  const validation = prop.validation;
  const modelId = prop.modelId;
  const entryId = validation.entryId;
  const [param, _setParam] = useState(validation.parameter);
  const paramRef = useRef(param);
  const setParam = (data) => {
    paramRef.current = data;
    _setParam(data);
  };

  const inputHelper = () => {
    const validationForm = document.getElementById(`${validation.id}-form`);
    const validationInput = document.getElementById(`${validation.id}-input`);
    validationForm?.addEventListener("dblclick", function () {
      validationInput.disabled = false;
      validationInput.focus();
    });
    validationInput?.addEventListener("blur", function () {
      validationInput.disabled = true;
      updateValidationParams();
    });
    validationInput?.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 13) {
        validationInput.disabled = true;
      }
    });
  };

  const updateValidationParams = async () => {
    dispatch(
      updateValidation(modelId, entryId, validation.id, {
        parameter: paramRef.current,
      })
    );
  };

  useEffect(() => {
    inputHelper();
  }, []);

  return (
    <div className="model-validation-list-item">
      <div className="model-validation-label">{validation.name}</div>
      <form id={`${validation.id}-form`} className="model-validation-form">
        <input
          value={param}
          id={`${validation.id}-input`}
          onChange={(e) => setParam(e.target.value)}
          disabled={true}
          placeholder="Please enter in JS format"
          className="model-validation-input"
        />
      </form>
      <button
        onClick={() => prop.deleteValidation(validation.id, validation.name)}
        className="model-validation-delete-btn"
      >
        <span className="fa fa-times-circle"></span>
      </button>
    </div>
  );
}

export default ModelValidation;
