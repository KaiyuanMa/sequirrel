import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ModelValidation from "./ModelValidation";
import { addValidationAC } from "../state/actionCreators/modelsAC";
import { updateDataSet } from "../api/dataSet";
import { deleteValidationAC } from "../state/actionCreators/modelsAC";

function ModelValidationList(props) {
  const dispatch = useDispatch();
  const entry = props.entry;
  const modelId = entry.modelId;
  const [validationsMenu, setValidationsMenu] = useState({
    is: entry.id,
    not: entry.id,
    isEmail: entry.id,
    isUrl: entry.id,
    isIP: entry.id,
    isIPv4: entry.id,
    isIPv6: entry.id,
    isAlpha: entry.id,
    isAlphanumeric: entry.id,
    isNumeric: entry.id,
    isInt: entry.id,
    isFloat: entry.id,
    isDecimal: entry.id,
    isLowercase: entry.id,
    isUppercase: entry.id,
    notNull: entry.id,
    isNull: entry.id,
    notEmpty: entry.id,
    equals: entry.id,
    contains: entry.id,
    notIn: entry.id,
    isIn: entry.id,
    notContains: entry.id,
    len: entry.id,
    isUUID: entry.id,
    isDate: entry.id,
    isAfter: entry.id,
    isBefore: entry.id,
    max: entry.id,
    min: entry.id,
    isCreditCard: entry.id,
  });

  const showValidationList = () => {
    const attributeContent = document.getElementById(`${entry.id}-content`);
    const validationList = document.getElementById(
      `${entry.id}-validation-list`
    );
    const validationBtn = document.getElementById(
      `${entry.id}-validation-list-show-btn`
    );
    const plusIcon = document.getElementById(
      `${entry.id}-validation-plus-icon`
    );
    const minusIcon = document.getElementById(
      `${entry.id}-validation-minus-icon`
    );
    plusIcon?.classList?.toggle("hidden");
    minusIcon?.classList?.toggle("hidden");
    validationBtn?.classList?.toggle("model-validation-list-btn-active");
    if (
      validationBtn?.classList?.contains("model-validation-list-btn-active")
    ) {
      validationList?.classList?.toggle("model-validation-float-window-active");
      attributeContent.style.overflow = "visible";
    } else {
      validationList?.classList?.toggle("model-validation-float-window-active");
      setTimeout(() => (attributeContent.style.overflow = "hidden"), 200);
    }
  };

  const deleteValidation = (validationId, validationName) => {
    dispatch(deleteValidationAC(modelId, entry.id, validationId));
    const dummy = validationsMenu;
    dummy[validationName] = entry.id;
    setValidationsMenu(dummy);
  };

  const toggleValidationBtn = (key, value) => {
    if (value != entry.id) {
      const validation = entry.validations.find(
        (validation) => validation.name == key
      );
      deleteValidation(validation.id, validation.name);
    } else addValidation(key);
  };

  const addValidation = (validationName) => {
    const dummy = validationsMenu;
    dummy[validationName] = null;
    dispatch(
      addValidationAC(modelId, entry.id, {
        name: validationName,
        entryId: entry.id,
      })
    );
    // const entryContent = document.getElementById(`${entry.Id}-content`);
    // entryContent.style.maxHeight = entryContent.scrollHeight + "px";
  };

  useEffect(() => {
    if (entry.validations) {
      const dummy = validationsMenu;
      for (let validation of entry.validations) {
        dummy[validation.name] = validation.parameter;
      }
      setValidationsMenu(dummy);
    }
  }, [props]);

  return (
    <div className="model-validation-wrapper">
      {entry.validations
        ? entry.validations.map((validation) => (
            <ModelValidation
              validation={validation}
              modelId={modelId}
              key={validation.id}
              deleteValidation={deleteValidation}
            />
          ))
        : null}
      <button
        id={`${entry.id}-validation-list-show-btn`}
        onClick={showValidationList}
        className="circle-btn model-validation-list-btn"
      >
        <span
          id={`${entry.id}-validation-plus-icon`}
          className="fa fa-plus-circle"
        />
        <span
          id={`${entry.id}-validation-minus-icon`}
          className="fa fa-minus-circle hidden"
        />
      </button>
      <div
        id={`${entry.id}-validation-list`}
        className="model-validation-float-window"
      >
        {Object.keys(validationsMenu).map((key, index) => {
          return (
            <button
              className={`model-validation-btn${
                validationsMenu[key] != entry.id ? " list-btn-active" : ""
              }`}
              onClick={() => toggleValidationBtn(key, validationsMenu[key])}
              key={`${entry.id}-${key}`}
            >
              <span
                className={`fa model-validation-btn-icon ${
                  validationsMenu[key] != entry.id
                    ? "fa-minus icon-black"
                    : "fa-plus"
                }`}
              />
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ModelValidationList;
