import * as React from "react";
/** Custom types */
import { UserAuth } from "../types";
/** Custom Hooks */
import useAuthHandler from "../utils/use-auth";
/** Utils */
import { DEFAULT_USER_AUTH } from "../utils/constants";
import { getStoredUserAuth } from "../utils/helpers";

interface IAuthContextInterface {
  auth: UserAuth;
  setAuthStatus: (userAuth: UserAuth) => void;
  setUnauthStatus: () => void;
}
export const authContext = React.createContext<IAuthContextInterface>({
  auth: DEFAULT_USER_AUTH,
  setAuthStatus: () => {},
  setUnauthStatus: () => {},
});
const { Provider } = authContext;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth, setAuthStatus, setUnauthStatus } = useAuthHandler(
    getStoredUserAuth()
  );
  return (
    <Provider value={{ auth, setAuthStatus, setUnauthStatus }}>
      {children}
    </Provider>
  );
};
export default AuthProvider;
