import { apiHelper } from "../plugins/axios";

export default {
  signIn({ username, password }) {
    return apiHelper.post("/auth/signin", {
      username,
      password,
    });
  },
  signUp(data) {
    return apiHelper.post("/auth/signup", {
      ...data,
    });
  },
  info() {
    return apiHelper.get(`/user/info?rand=${new Date().getTime()}`);
  },
  infoById(id) {
    return apiHelper.get(`/user/${id}/info?rand=${new Date().getTime()}`);
  },
  checkToken() {
    return apiHelper.post(`/auth/checkToken?rand=${new Date().getTime()}`);
  }
};
