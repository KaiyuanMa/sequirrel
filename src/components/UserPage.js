import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataSetsAC,
  addDataSetAC,
  deleteDataSetAC,
} from "../state/actionCreators/dataSetsAC";
import { setDataSetAC } from "../state/actionCreators/dataSetAC";
import { setRecentDataSetAC } from "../state/actionCreators/authAC";
import { logout } from "../state/actionCreators/authAC";

function UserPage() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { dataSet } = useSelector((state) => state.dataSet);
  const { dataSets } = useSelector((state) => state.dataSets);

  useEffect(() => {
    dispatch(setDataSetsAC());
  }, []);

  const switchDataSet = (currDataSetId) => {
    dispatch(setDataSetAC(currDataSetId, dataSet.id));
    dispatch(setRecentDataSetAC(currDataSetId));
  };

  const deleteDataSet = (dataSetId) => {
    if (dataSet.id == dataSetId) dispatch(setDataSetAC());
    dispatch(deleteDataSetAC(dataSetId));
  };

  return (
    <div className="user-page-wrapper">
      <div className="user-page-header">{`Welcome, ${auth.username}`}</div>
      <hr className="user-page-hr" />
      <div className="user-page-dataSet-list">
        <div className="user-dataSet-list-header">
          <span className="fa fa-database" />
          <p className="subtitle-medium">Datasets</p>
        </div>
        <div
          onClick={() => {
            dispatch(
              addDataSetAC({
                name: `Dataset #${dataSets.length + 1}`,
                userId: auth.id,
              })
            );
          }}
          className="user-page-dataSet-list-item add-new-dataset"
        >
          + New Dataset
        </div>
        {dataSets.map((currDataSet) => (
          <div
            className="user-page-dataSet-list-item-wrapper"
            key={`${currDataSet.id}-dataset-list-item`}
          >
            <div
              onClick={() => {
                switchDataSet(currDataSet.id);
              }}
              key={currDataSet.id}
              className={`user-page-dataSet-list-item${
                currDataSet.id == dataSet.id
                  ? " user-page-dataSet-list-item-active"
                  : ""
              }`}
            >
              {currDataSet.name}
            </div>
            {/* <div
              className={`user-page-dataSet-list-item-btn user-page-dataSet-list-item-edit-btn${
                currDataSet.id == dataSet.id
                  ? " user-page-dataSet-list-item-btn-active"
                  : ""
              }`}
            >
              <span className="fa fa-pencil" />
            </div> */}
            <div
              className={`user-page-dataSet-list-item-btn user-page-dataSet-list-item-delete-btn${
                currDataSet.id == dataSet.id
                  ? " user-page-dataSet-list-item-btn-active"
                  : ""
              }`}
              onClick={() => deleteDataSet(currDataSet.id)}
            >
              <span className="fa fa-times" />
            </div>
          </div>
        ))}
      </div>
      <div className="user-page-footer">
        <hr className="user-page-hr" />
        <div className="user-page-footer-header">
          <span className="fa fa-gears" />
          <p className="subtitle-medium">Controls</p>
        </div>
        <div className="user-page-footer-content">
          <button
            onClick={() => {
              dispatch(setDataSetAC());
              dispatch(logout());
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
