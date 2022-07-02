import { AuthService } from "./authentication/auth";
import { DatabaseService } from "./firestore/database";
const Api = {
  auth: {
    createAccount: AuthService.createAccount,
    signOut: AuthService.logOut,
    signIn: AuthService.login,
  },
  firestore: {
    addData: DatabaseService.addData,
    updateDoc: DatabaseService.updateDoc,
    deleteDoc: DatabaseService.deleteDoc,
  },
};
export default Api;
