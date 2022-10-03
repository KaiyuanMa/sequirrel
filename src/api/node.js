const axios = require("axios");

//GET

const getNode = (modelId) => {
  return axios.get(`/api/node/model/${modelId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const getDataSetNode = (dataSetId) => {
  return axios.get(`/api/node/${dataSetId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//DELETE
const apiDeleteNode = (modelId) => {
  return axios.delete(`/api/node/model/${modelId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//POST
const apiAddNode = (node) => {
  return axios.post(`/api/node`, node, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//PUT
const apiUpdateNode = (modelId, params) => {
  return axios.put(`/api/node/${modelId}`, params, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export { getNode, getDataSetNode, apiAddNode, apiUpdateNode, apiDeleteNode };
