import axios from "axios";

export const getUser = (url) => {
  return axios.get(url);
};

export default getUser;
