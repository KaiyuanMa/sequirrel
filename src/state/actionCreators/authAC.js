import { apiSetAuth, apiGetAuth, apiSetRecent } from "../../api/auth";

const login = (credentials) => {
  return async (dispatch) => {
    try {
      let response = await apiSetAuth(credentials);
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      response = await apiGetAuth(token);
      const auth = response.data;
      dispatch({ type: "SET_AUTH", auth: auth });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "SET_AUTH", auth: {} });
  };
};

const exchangeToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await apiGetAuth(token);
      const auth = response.data;
      dispatch({ type: "SET_AUTH", auth: auth });
    }
  };
};

const setRecentDataSetAC = (dataSetId) => {
  return async (dispatch) => {
    try {
      await apiSetRecent(dataSetId);
      dispatch({ type: "SET_RECENT", dataSetId: dataSetId });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export { login, logout, exchangeToken, setRecentDataSetAC };
