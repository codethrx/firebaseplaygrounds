import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//pages
import Signup from "./pages/Signup";
import Login from "./pages/Signup";
import FireOperations from "./pages/FireOperations";
//context
import useAuthContext from "./context/AuthContext/useAuthContext";
import Api from "./firebase/API";
import { useFirebase } from "./firebase/hooks/useFirebase";
import AUTH_ACTIONS from "./context/AuthContext/AuthActions";

function App() {
  const { user, dispatchUserCreds } = useAuthContext();
  const { data, error, isLoading, onRequest } = useFirebase({
    onRequestService: Api.auth.signOut,
  });

  const handleUserLogout = async () => {
    await onRequest();
    dispatchUserCreds({ type: AUTH_ACTIONS.LOG_OUT });
  };
  console.log(user);
  return (
    <div className="App">
      <h1>Hello</h1>
      {user && <button onClick={handleUserLogout}>Logout</button>}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/crud" element={<FireOperations />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
