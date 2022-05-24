import { app } from "@/firebase";
import store from "@/store";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const register = (fullName, email, password, success) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      return updateProfile(user, { displayName: fullName }).then(() => {
        store.dispatch("setUser", user);
        success();
      });
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          Swal.fire({
            icon: "info",
            title: "Oops...",
            text: "This User Already Exist!",
          });
          break;
      }
    });
};

export const login = (email, password, success, onError) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      store.dispatch("setUser", user);
      success();
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/wrong-password":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your Password is wrong!",
          });
          break;

        case "auth/user-not-found":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User Not Found!",
          });
          break;
      }
    });
};

export const logout = (success) => {
  signOut(auth)
    .then(() => success())
    .catch((e) => {
      console.log(e);
    });
};

export const resetPassword = (email, success) => {
  sendPasswordResetEmail(auth, email)
    .then(() => success())
    .catch((error) => {

      switch (error.code) {
        case "auth/user-not-found":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User Not Found!",
          });
          break;
      }
    });
};

export const googleAuth = (success) => {
  signInWithPopup(auth, provider).then(() => success());
};
