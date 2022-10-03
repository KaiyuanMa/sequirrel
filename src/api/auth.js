const axios = require("axios");

const apiGetAuth = (token) => {
  return axios.get("/api/session", {
    headers: {
      authorization: token,
    },
  });
};

const apiSetAuth = (credentials) => {
  return axios.post("/api/session", credentials);
};

const apiSetRecent = (dataSetId) => {
  return axios.put(
    "/api/session/recent",
    { recentDataSet: dataSetId },
    {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    }
  );
};

export { apiGetAuth, apiSetAuth, apiSetRecent };
