const axios = require("axios");

const apiAddUser = (user) => {
  return axios.post("api/user", user);
};

export { apiAddUser };
