const axios = require("axios");

const apiAddUser = (user) => {
  return axios.post("api/session/signup", user);
};

export { apiAddUser };
