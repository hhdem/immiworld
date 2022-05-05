import axios from "axios";
import { Promise } from 'es6-promise';

export const baseURL = "http://localhost:4000";

let myredirect;
export default function ({redirect }) {
  myredirect = redirect;
}

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Cache-Control": "no-cache",
  },
});
// const token = localStorage.getItem("token");
// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  axiosInstance.interceptors.request.use(
    (config) => {
      if (process.browser) {
        const token = localStorage.getItem("token");
          console.info('axiosInstance.interceptors.request.use = ', token);
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
  
      return config;
    },
    (err) => Promise.reject(err)
  );
  
  axiosInstance.interceptors.response.use((response) => {
    // Return a successful response back to the calling service
    return response;
  }, (error) => {
    console.info('axios ', error.response);
    if (error.response.status === 429) {
      return new Promise((resolve, reject) => {
        error.response.statusText = '请求过于频繁';
        reject(error.response);
      });
    }
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error.response);
      });
    }
    
    // Logout user if token refresh didn't work or user is disabled
    if (error.response.message == 'Account is disabled.') {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.clear();
      return myredirect('/signin')
  
      // return new Promise((resolve, reject) => {
      //   reject(error);
      // });
    }
    const rt = localStorage.getItem("refresh_token");
    // 判斷是否有refresh_token，沒有則return請求
    if (!rt) {
      localStorage.clear();
      return myredirect('/signin')
      // return new Promise((resolve, reject) => {
      //   reject(error);
      // });
    }
    // 获取新token
    var getNewToken = new Promise((resolve, reject) => {
      axios
      .post(baseURL+"/auth/refresh", { refresh_token: rt })
      .then(response => {

        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);

        resolve(response.data.accessToken);
      })
      .catch((error) => {
        // eval(new String(globalThis.$nuxt.$store._mutations.revokeAuthentication[0]));
        // globalThis.$nuxt.$store.state.currentUser = {};
        // globalThis.$nuxt.$store.state.isAuthenticated = false;
        // globalThis.$nuxt.$store.state.token = "";
        // state.revokeAuthentication();
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        reject(error);
      });
    });
  
    return getNewToken.then((token) => {
        // Try request again with new token
        // New request with new token
        const config = error.config;
        config.headers['Authorization'] = `Bearer ${token}`;
        return new Promise((resolve, reject) => {
          axios.request(config).then(response => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          })
        });
  
      })
      .catch((error) => {
        return myredirect('/');
        // Promise.reject(error);
      });
  });
  
export const apiHelper = axiosInstance;

