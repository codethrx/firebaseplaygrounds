import { createContext, useReducer, useEffect } from "react";
import AUTH_ACTIONS from "./AuthActions";
import { auth } from "../../firebase/@firebase";
import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = createContext();

const reduceUserCreds = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTHENTICATE:
      return { ...state, user: action.payload };
    case AUTH_ACTIONS.AUTH_IS_READY:
      console.log("user status changed -- test");
      return { ...state, authIsReady: true, user: action.payload };
    case AUTH_ACTIONS.LOG_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [userCreds, dispatchUserCreds] = useReducer(reduceUserCreds, {
    user: null,
    authIsReady: false,
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatchUserCreds({ type: AUTH_ACTIONS.AUTH_IS_READY, payload: user });
      unsubscribe();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ ...userCreds, dispatchUserCreds }}>
      {children}
    </AuthContext.Provider>
  );
};
