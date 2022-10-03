const axios = require("axios");

//GET

const apiGetValidation = (validationId) => {
  return axios.get(`/api/validation/${validationId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//DELETE

const apiDeleteValidation = (validationId) => {
  return axios.delete(`/api/validation/${validationId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//POST

const apiAddValidation = (validation) => {
  return axios.post("/api/validation", validation, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//PUT

const apiUpdateValidation = (validationId, params) => {
  return axios.put(`/api/validation/${validationId}`, params, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export {
  apiGetValidation,
  apiDeleteValidation,
  apiAddValidation,
  apiUpdateValidation,
};
