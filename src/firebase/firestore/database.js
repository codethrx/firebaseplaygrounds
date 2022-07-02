//
import COLLECTIONS from "../../constants/COLLECTIONS";
import { firestore } from "../@firebase";
import {
  collection,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
class Database {
  deleteDoc = async (collectionName, docId, data) => {
    return new Promise(async (response, reject) => {
      try {
        const ref = doc(firestore, collectionName, docId);

        // Set the "capital" field of the city 'DC'
        await deleteDoc(ref);
        response("Successfully deleted");
        response(document);
      } catch (e) {
        console.log(collectionName, data);
        console.log(e?.message);
        console.log(e?.code);
        reject(e?.code);
      }
    });
  };

  updateDoc = async (collectionName, docId, data) => {
    return new Promise(async (response, reject) => {
      try {
        const ref = doc(firestore, collectionName, docId);

        // Set the "capital" field of the city 'DC'
        const document = await updateDoc(ref, {
          username: "codingaddict",
        });
        response(document);
      } catch (e) {
        console.log(collectionName, data);
        console.log(e?.message);
        console.log(e?.code);
        reject(e?.code);
      }
    });
  };
  // new Promise(async (response, reject) => {
  //   try {
  //     const ref = doc(firestore, collectionName, docId);

  //     // Set the "capital" field of the city 'DC'
  //     const document = await updateDoc(ref, {
  //       username: "codingaddict",
  //     });
  //     response(document);
  //   } catch (e) {
  //     console.log(collectionName, data);
  //     console.log(e?.message);
  //     console.log(e?.code);
  //     reject(e?.code);
  //   }
  // });

  addData = async (collectionName, data) => {
    return new Promise(async (response, reject) => {
      try {
        const ref = collection(firestore, collectionName);
        const document = await addDoc(ref, data);
        response(document);
      } catch (e) {
        console.log(collectionName, data);
        console.log(e?.message);
        reject(e?.code);
      }
    });
  };
}
export const DatabaseService = new Database();
