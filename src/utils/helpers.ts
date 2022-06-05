import { DEFAULT_USER_AUTH } from "./constants";
import { UserAuth } from "../types";
/** Return user auth from local storage value */
export const getStoredUserAuth = (): UserAuth => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};

export const dateToStr = (date: Date):String => {
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}