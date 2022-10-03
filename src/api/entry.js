const axios = require("axios");

//GET

const apiGetEntry = (entryId) => {
  return axios.get(`/api/entry/${entryId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const getEntryValidations = (entryId) => {
  return axios.get(`/api/entry/${entryId}/validation`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//DELETE

const deleteEntry = (entryId) => {
  return axios.delete(`/api/entry/${entryId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//POST

const addEntry = (entry) => {
  return axios.post("/api/entry", entry, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//PUT

const apiUpdateEntry = (entryId, params) => {
  return axios.put(`/api/entry/${entryId}`, params, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export {
  apiGetEntry,
  getEntryValidations,
  deleteEntry,
  addEntry,
  apiUpdateEntry,
};
