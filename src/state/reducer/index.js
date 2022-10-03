import { combineReducers } from "redux";
import modelsReducer from "./modelsReducer";
import authReducer from "./authReducer";
import dataSetReducer from "./dataSetReducer";
import dataSetsReducer from "./dataSetsReducer";

const reducers = combineReducers({
  dataSets: dataSetsReducer,
  dataSet: dataSetReducer,
  models: modelsReducer,
  auth: authReducer,
});

export default reducers;
