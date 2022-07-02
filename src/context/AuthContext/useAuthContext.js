import { AuthContext } from "./AuthContext";
import { useContext } from "react";
export default function useAuthContext() {
  const values = useContext(AuthContext);
  if (!values) {
    throw new Error("Context is being accessed from outside");
  }
  return values;
}
