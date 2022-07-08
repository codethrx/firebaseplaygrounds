import React from "react";
import { useFirebase } from "../firebase/hooks/useFirebase";
import Api from "../firebase/API";
import COLLECTIONS from "../constants/COLLECTIONS";
function FireOperations() {
  // console.log(Api.firestore);
  const { isLoading, data, error, onRequest } = useFirebase({
    // onRequestService: Api.firestore.addData,
    // onRequestService: Api.firestore.updateDoc,
    // onRequestService: Api.firestore.deleteDoc,
    onRequestService: Api.firestore.getDoc,
  });
  //   console.log(COLLECTIONS.USERS);
  //   const addFirebaseDoc = async () => {
  //     const data = {
  //       email: "123@gmail.com",
  //       password: "xxxxxxxx",
  //     };
  //     onRequest(COLLECTIONS.USERS, data);
  //   };
  //   console.log(onRequest);
  const updateFirebaseDoc = async () => {
    // console.log("clicked");
    // const data = { username: "99abc" };
    // onRequest(COLLECTIONS.USERS, "Z7oWrr8ypwYGty03u8RD", data);
    // onRequest(COLLECTIONS.USERS, "Z7oWrr8ypwYGty03u8RD");
    await onRequest(
      COLLECTIONS.USERS,

      "11ZWAJJYNCPOzfCyjKMqaVbvNRG3"
    );
  };
  console.log(data);
  console.log(error);
  return (
    <div>
      {/* <button onClick={addFirebaseDoc}>Click</button> */}
      {!isLoading && <button onClick={updateFirebaseDoc}>Update</button>}
      {isLoading && <button disabled>Updating...</button>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default FireOperations;
