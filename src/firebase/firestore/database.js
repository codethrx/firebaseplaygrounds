//
import COLLECTIONS from "../../constants/COLLECTIONS";
import { firestore } from "../@firebase";
import {
  collection,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  addDoc,
} from "firebase/firestore";
//utils
import { formatDoc } from "./utils";
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
        // console.log(collectionName, data);
        // console.log(e?.message);
        // console.log(e?.code);
        reject("Error deleting");
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
        response("Successfully Updated");
      } catch (e) {
        // console.log(collectionName, data);
        // console.log(e?.message);
        // console.log(e?.code);
        reject("Error in Updating Record");
      }
    });
  };

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
  getDocs = async (collectionName) => {
    return new Promise(async (resolve, reject) => {
      console.log("Inside firebase getDocs");
      try {
        const documents = await getDocs(collection(firestore, collectionName));
        if (documents.docs.length === 0) {
          resolve("List is empty");
          return;
        }
        const formattedDocs = documents.docs.map(formatDoc);
        resolve(formattedDocs);
      } catch (e) {
        reject(e?.code);
      }
    });
  };
  getDoc = async (collectionName, id) => {
    return new Promise(async (resolve, reject) => {
      // console.log("Inside firebase getDocs");
      try {
        const document = await getDoc(doc(firestore, collectionName, id));
        console.log(document);
        if (!document._document) {
          resolve("No Document exist");
          return;
        }
        const formattedDoc = formatDoc(document);
        resolve(formattedDoc);
        resolve("data fetched");
      } catch (e) {
        reject(e?.code);
      }
    });
  };
}
export const DatabaseService = new Database();
