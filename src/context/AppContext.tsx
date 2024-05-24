import { createContext, useContext, useState } from "react";
import axios from "axios";

// const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
// const refreshToken = JSON.parse(localStorage.getItem("refreshToken") || "");

export interface AuthStateInterface {
  accessToken: string;
  refreshToken: string;
}

const initState = {
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sInN1YiI6ImFhYWFAZ21haWwuY29tIiwiaWF0IjoxNzE2NTI4NjIzLCJleHAiOjE3MTY3MDE0MjN9.__hMCn9_-Bw9aVeSB7nJZf7ctpxcq-oPUsw3RfdyjAM",
  refreshToken: "",
};
const { VITE_BASE_URL } = import.meta.env;
// @ts-ignore
const AppContext = createContext();

const AppProvider = ({ children }: any) => {
  const [state, setStateContext] = useState<AuthStateInterface>(initState);
  const bearerToken = "Bearer " + state.accessToken;
  axios.defaults.headers.common["Authorization"] = bearerToken;
  const authenFetch = axios.create({
    baseURL: VITE_BASE_URL,
  });

  // Add a request interceptor
  authenFetch.interceptors.request.use(
    function (config) {
      console.log(config.url, "App context config");
      // Do something before request is sent

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  // Add a response interceptor
  authenFetch.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
      }
      if (error.response.status === 403) {
      }
      if (error.response.status === 11000) {
      }
      return Promise.reject(error);
    }
  );
  return (
    <AppContext.Provider
      value={{
        ...state,
        authenFetch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAuthen = () => useContext(AppContext);

export { useAuthen, AppProvider };
