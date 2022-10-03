import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateModelEntryAC } from "../state/actionCreators/modelsAC";

function ModelAttributeBtnGroup(props) {
  const dispatch = useDispatch();
  const entry = props.entry;
  const [btnMenu, setBtnMenu] = useState([]);
  const btnNameList = ["autoIncrement", "primaryKey", "unique", "allowNull"];

  useEffect(() => {
    const currBtnMenu = [];
    for (let btnName of btnNameList) {
      currBtnMenu.push({ name: btnName, status: entry[btnName] });
    }
    setBtnMenu(currBtnMenu);
  }, [props]);

  const buttonUpdate = (property) => {
    const params = {};
    params[property] = !entry[property];
    dispatch(updateModelEntryAC(entry.modelId, entry.id, params));
  };

  const buttonToggleNull = (property) => {
    const params = {};
    if (entry[property] == null) {
      params[property] = true;
      dispatch(updateModelEntryAC(entry.modelId, entry.id, params));
    } else {
      params[property] = null;
      dispatch(updateModelEntryAC(entry.modelId, entry.id, params));
    }
  };

  const showBtnList = () => {
    const plusIcon = document.getElementById(`${entry.id}-plus-icon`);
    const minusIcon = document.getElementById(`${entry.id}-minus-icon`);
    const btnGroup = document.getElementById(`${entry.id}-btn-group`);
    plusIcon?.classList?.toggle("hidden");
    minusIcon?.classList?.toggle("hidden");
    btnGroup?.classList?.toggle("model-attribute-btn-group-float-active");
  };

  return (
    <div className="model-attribute-btn-group">
      <button onClick={showBtnList} className="square-btn">
        <span id={`${entry.id}-plus-icon`} className="fa fa-plus-square-o" />
        <span
          id={`${entry.id}-minus-icon`}
          className="fa fa-minus-square-o hidden"
        />
      </button>
      {btnMenu.map((btn) =>
        btn.status != null ? (
          <button
            onClick={() => buttonUpdate(btn.name)}
            className="model-attribute-btn"
            key={`${entry.id}-${btn.name}-active`}
          >
            {btn.name}
            <span
              className={`fa fa-thumbs-o-up${
                btn.status ? " thumbs-up" : " thumbs-down   "
              }`}
            />
          </button>
        ) : null
      )}
      <div
        id={`${entry.id}-btn-group`}
        className="model-attribute-btn-group-float"
      >
        {btnMenu.map((btn) => (
          <button
            onClick={() => buttonToggleNull(btn.name)}
            className={`model-attribute-btn${
              btn.status != null ? " list-btn-active" : ""
            }`}
            key={`${entry.id}-${btn.name}`}
          >
            <span
              className={`fa model-attribute-btn-icon ${
                btn.status != null ? "fa-minus icon-black" : "fa-plus"
              }`}
            />
            {btn.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ModelAttributeBtnGroup;
