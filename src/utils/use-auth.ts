import * as React from "react";
/** Custom types */
import { UserAuth } from "../types";
/** Utils */
import { DEFAULT_USER_AUTH } from "./constants";
const useAuthHandler = (initialState: UserAuth) => {
  const [auth, setAuth] = React.useState(initialState);
  const setAuthStatus = (userAuth: UserAuth) => {
    window.sessionStorage.setItem("UserAuth", JSON.stringify(userAuth));
    setAuth(userAuth);
  };
  const setUnauthStatus = () => {
    window.sessionStorage.clear();
    setAuth(DEFAULT_USER_AUTH);
  };
  return {
    auth,
    setAuthStatus,
    setUnauthStatus,
  };
};
export default useAuthHandler;
