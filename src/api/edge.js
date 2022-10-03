const axios = require("axios");
//GET

const getEdges = (modelId) => {
  return axios.get(`/api/edge/model/${modelId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const getDataSetEdges = (dataSetId) => {
  return axios.get(`/api/edge/${dataSetId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//DELETE

const apiDeleteEdge = (edgeId) => {
  return axios.delete(`/api/edge/${edgeId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const apiDeleteEdgeByNode = (idA, idB) => {
  return axios.delete(`/api/edge/node/${idA}/${idB}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//POST

const apiAddEdge = (edge) => {
  return axios.post(`/api/edge`, edge, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//PUT

const apiUpdateEdge = (edgeId, params) => {
  return axios.put(`/api/edge/${edgeId}`, params, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export {
  getEdges,
  getDataSetEdges,
  apiDeleteEdge,
  apiAddEdge,
  apiDeleteEdgeByNode,
  apiUpdateEdge,
};
