import { getDataSetModels } from "../../api/dataSet";
import {
  getModel,
  addModel,
  apiDeleteModel,
  updateModel,
} from "../../api/model";
import {
  addEntry,
  deleteEntry,
  apiUpdateEntry,
  apiGetEntry,
} from "../../api/entry";
import {
  apiDeleteValidation,
  apiAddValidation,
  apiUpdateValidation,
  apiGetValidation,
} from "../../api/validation";

const setModelsAC = (dataSetId) => {
  return async (dispatch) => {
    try {
      const { data } = await getDataSetModels(dataSetId);
      dispatch({
        type: "SET_MODELS",
        models: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const setModelAC = (modelId) => {
  return async (dispatch) => {
    try {
      const { data } = await getModel(modelId);
      dispatch({
        type: "SET_MODEL",
        model: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const addModelAC = (model) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_MODEL",
      model: model,
    });
  };
};

const deleteModelAC = (modelId) => {
  return async (dispatch) => {
    try {
      await apiDeleteModel(modelId);
      dispatch({
        type: "DEL_MODEL",
        modelId: modelId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const editModelAC = (modelId, params) => {
  return async (dispatch) => {
    try {
      await updateModel(modelId, params);
      const { data } = await getModel(modelId);
      console.log(data);
      dispatch({
        type: "UPDATE_MODEL",
        modelId: modelId,
        model: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

//ENTRY
const addModelEntry = (params) => {
  return async (dispatch) => {
    try {
      const { data } = await addEntry(params);
      dispatch({
        type: "ADD_ENTRY",
        modelId: params.modelId,
        entry: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const deleteModelEntry = (modelId, entryId) => {
  return async (dispatch) => {
    try {
      await deleteEntry(entryId);
      dispatch({
        type: "DELETE_ENTRY",
        modelId: modelId,
        entryId: entryId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const updateModelEntryAC = (modelId, entryId, params) => {
  return async (dispatch) => {
    try {
      await apiUpdateEntry(entryId, params);
      const { data } = await apiGetEntry(entryId);
      dispatch({
        type: "UPDATE_ENTRY",
        modelId: modelId,
        entryId: entryId,
        entry: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

//Validation
const addValidationAC = (modelId, entryId, params) => {
  return async (dispatch) => {
    try {
      const { data } = await apiAddValidation(params);
      dispatch({
        type: "ADD_VALIDATION",
        modelId: modelId,
        entryId: entryId,
        validation: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const deleteValidationAC = (modelId, entryId, validationId) => {
  return async (dispatch) => {
    try {
      await apiDeleteValidation(validationId);
      dispatch({
        type: "DELETE_VALIDATION",
        modelId: modelId,
        entryId: entryId,
        validationId: validationId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const updateValidation = (modelId, entryId, validationId, params) => {
  return async (dispatch) => {
    try {
      await apiUpdateValidation(validationId, params);
      const { data } = await apiGetValidation(validationId);
      dispatch({
        type: "UPDATE_VALIDATION",
        modelId: modelId,
        entryId: entryId,
        validationId: validationId,
        validation: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export {
  setModelsAC,
  setModelAC,
  addModelAC,
  deleteModelAC,
  editModelAC,
  addModelEntry,
  deleteModelEntry,
  updateModelEntryAC,
  addValidationAC,
  deleteValidationAC,
  updateValidation,
};
