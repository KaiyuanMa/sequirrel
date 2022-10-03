const axios = require("axios");

//GET

const getModel = (modelId) => {
  return axios.get(`/api/model/${modelId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const getModelEntries = (modelId) => {
  return axios.get(`/api/model/${modelId}/entry`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//DELETE

const apiDeleteModel = (modelId) => {
  return axios.delete(`/api/model/${modelId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//POST

const apiAddModel = (model) => {
  return axios.post("/api/model", model, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//PUT

const updateModel = (modelId, params) => {
  return axios.put(`/api/model/${modelId}`, params, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export { getModel, getModelEntries, apiDeleteModel, apiAddModel, updateModel };
