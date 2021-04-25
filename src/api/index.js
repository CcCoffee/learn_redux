import axios from "axios";

export const fetchListViaHttp = () => {
  return axios.get("/todos");
};
