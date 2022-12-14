import {
  getDataSet,
  apiDeleteDataSet,
  apiAddDataSet,
  updateDataSet,
} from "../../api/dataSet";

const setDataSetAC = (dataSetId, oldDataSetId) => {
  return async (dispatch) => {
    try {
      if (!dataSetId) {
        dispatch({
          type: "SET_DATASET",
          dataSet: {},
        });
      } else {
        const response = await getDataSet(dataSetId);
        dispatch({
          type: "SET_DATASET",
          dataSet: response.data,
        });
      }
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
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const addDataSetAC = (dataSet) => {
  return async (dispatch) => {
    try {
      const { data } = await apiAddDataSet(dataSet);
      dispatch({
        type: "ADD_DATASET",
        dataSet: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const updateDataSetAC = (dataSetId, params) => {
  return async (dispatch) => {
    try {
      const { data } = await updateDataSet(dataSetId, params);
      dispatch({
        type: "UPDATE_DATASET",
        dataSet: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export { setDataSetAC, deleteDataSetAC, addDataSetAC, updateDataSetAC };
