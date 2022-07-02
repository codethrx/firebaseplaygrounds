import { auth } from "../@firebase";
import { ERROR } from "./ERRORS";
import { firestore } from "../@firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import COLLECTIONS from "../../constants/COLLECTIONS";
class Auth {
  logOut = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await signOut(auth);
        resolve("Success");
      } catch (e) {
        console.log(e.message);
        reject("Error");
      }
    });
  };
  login = async (values = { email: "", password: "" }) => {
    const { email, password } = values || {};
    return new Promise(async (resolve, reject) => {
      try {
        const data = await signInWithEmailAndPassword(auth, email, password);

        const user = data.user || {};

        resolve(user);
      } catch (error) {
        switch (error.code) {
          case ERROR.INVALID_EMAIL:
            reject("Invalid email address");
            break;

          case ERROR.INVALID_PASSWORD:
            reject("Invalid password");
            break;

          case ERROR.INVALID_PHONE:
            reject("Invalid phone number");
            break;

          case ERROR.TOKEN_EXPIRES:
            reject("Token expired");
            break;

          case ERROR.USER_NOT_EXIST:
            reject(`User doesn't exist`);
            break;

          case ERROR.NETWORK_FAILED:
            reject(`Network request failed`);
            break;

          default:
            reject(error?.code);
        }
      }
    });
  };
  createAccount = async (values = { email: "", password: "" }) => {
    const { email, password } = values || {};

    return new Promise(async (resolve, reject) => {
      try {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = data.user;
        console.log(user.uid);
        console.log(COLLECTIONS.USERS);
        await setDoc(doc(firestore, COLLECTIONS.USERS, user.uid.toString()), {
          email,
        });

        resolve(user);
      } catch (error) {
        switch (error.code) {
          case ERROR.EMAIL_EXIST:
            reject("This email already exist");
            break;

          case ERROR.EMAIL_ALREADY_USED:
            reject("This email already exist");
            break;

          case ERROR.INVALID_EMAIL:
            reject("Invalid email address");
            break;

          case ERROR.INVALID_PASSWORD:
            reject("Invalid password");
            break;

          case ERROR.INVALID_PHONE:
            reject("Invalid phone number");
            break;

          case ERROR.TOKEN_EXPIRES:
            reject("Token expired");
            break;

          case ERROR.USER_NOT_EXIST:
            reject(`User doesn't exist`);
            break;

          case ERROR.NETWORK_FAILED:
            reject(`Network request failed`);
            break;

          default:
            reject(error?.code);
        }
      }
    });
  };
}

const AuthService = new Auth();

export { AuthService };
