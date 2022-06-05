import { DEFAULT_USER_AUTH } from "./constants";
import { UserAuth } from "../types";
/** Return user auth from local storage value */
export const getStoredUserAuth = (): UserAuth => {
  const auth = window.sessionStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};

export const dateToStr = (date: Date):String => {
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

export const objectMap = (object:any, mapFn:any) => {
  return Object.keys(object).reduce((result:any, key:any) => {
    result[key] = mapFn(object[key])
    return result
  }, {})
}
