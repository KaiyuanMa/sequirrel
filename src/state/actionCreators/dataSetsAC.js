import {
  apiGetDataSets,
  apiAddDataSet,
  apiDeleteDataSet,
} from "../../api/dataSet";

const setDataSetsAC = () => {
  return async (dispatch) => {
    try {
      const response = await apiGetDataSets();
      dispatch({
        type: "SET_DATASETS",
        dataSets: response.data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const addDataSetAC = (dataSet) => {
  return async (dispatch) => {
    try {
      const response = await apiAddDataSet(dataSet);
      dispatch({
        type: "ADD_DATASET",
        dataSet: response.data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const deleteDataSetAC = (dataSetId) => {
  return async (dispatch) => {
    try {
      await apiDeleteDataSet(dataSetId);
      dispatch({
        type: "DEL_DATASET",
        dataSetId: dataSetId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export { setDataSetsAC, addDataSetAC, deleteDataSetAC };
