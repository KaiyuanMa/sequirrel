const reducer = (state = { auth: {} }, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, auth: action.auth };
    case "SET_RECENT":
      const dummy = state.auth;
      dummy.recentDataSet = action.dataSetId;
      return { ...state, auth: dummy };
    default:
      return state;
  }
};

export default reducer;
