import { AuthService } from "./authentication/auth";

const Api = {
  auth: {
    createAccount: AuthService.createAccount,
    signOut: AuthService.logOut,
    signIn: AuthService.login,
  },
  // firestore: {},
};
export default Api;
