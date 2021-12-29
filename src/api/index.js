import axios from "axios";

class ApiClient {
  users = {
    getUsers: { url: "", method: "get" },
    getUser: { url: "{user_id}", method: "get" },
  };

  constructor() {
    Object.entries(this).forEach(([key, value]) => {
      Object.entries(value).forEach(([k, v]) => {
        this[key][k] = ({ data, query, param, headers } = {}) => {
          let path = v.url.replace(/\{.+?\}/gi, (p) => {
            const key = p.replace("{", "").replace("}", "");

            return param[key.toLowerCase()];
          });

          path = path ? `/${path}` : "";

          return axios({
            method: v?.method?.toUpperCase(),
            baseURL: "https://reqres.in/api",
            url: `/${key}${path}`,
            data,
            params: query,
            headers,
          });
        };
      });
    });
  }
}

export default new ApiClient();
