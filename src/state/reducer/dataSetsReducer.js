const reducer = (state = { dataSets: [] }, action) => {
  switch (action.type) {
    case "SET_DATASETS":
      return { ...state, dataSets: action.dataSets };
    case "ADD_DATASET":
      return { ...state, dataSets: [...state.dataSets, action.dataSet] };
    case "DEL_DATASET":
      return {
        ...state,
        dataSets: state.dataSets.filter(
          (dataSet) => action.dataSetId != dataSet.id
        ),
      };
    default:
      return state;
  }
};

export default reducer;
