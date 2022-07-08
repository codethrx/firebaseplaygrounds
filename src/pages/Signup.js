import React, { useEffect } from "react";
import { useFirebase } from "../firebase/hooks/useFirebase";
import useAuthContext from "../context/AuthContext/useAuthContext";
import Api from "../firebase/API";
import AUTH_ACTIONS from "../context/AuthContext/AuthActions";
function Signup() {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const { email, password } = formData;
  const { user, dispatchUserCreds } = useAuthContext();
  const { data, isLoading, error, onRequest, setError } = useFirebase({
    // onRequestService: Api.auth.createAccount,
    onRequestService: Api.auth.signIn,
  });
  useEffect(() => {
    if (data) {
      dispatchUserCreds({ type: AUTH_ACTIONS.AUTHENTICATE, payload: data });
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);
  //event handlers
  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRequest({ ...formData });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleChangeInput}
        />
        <input
          type="text"
          id="password"
          value={password}
          onChange={handleChangeInput}
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Signup;
