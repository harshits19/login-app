import { useState } from "react";
import { Link } from "react-router-dom";
import { database } from "./firebaseConfig"; //step 3
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth"; //step 4

// Step 2 -- Create a form and console the input values
const LoginSignup = () => {
  const [login, setLogin] = useState(false); //step 8 -- to choose login or signup mode

  const handleSubmit = (e, type) => {
    e.preventDefault(); //to prevent page from reloading
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type == "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((cred) => {
          sendEmailVerification(cred.user); //step 9 -- option to send email to verify user
          alert(
            "An email has been send to verify user, check your inbox and verify your account"
          );
          console.log("Signup data : ", cred); // step 5 -- use createUser() to store email n pass on firebase DB
        })
        .catch((err) => {
          alert(err.code);
          console.log("Signup Error :", err);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log("Login Data :", data); // step 7 -- use signIn() to authenticate email n pass on firebase DB
          setLogin(true);
        })
        .catch((err) => {
          alert(err.code);
          console.log(err, "login eorr");
        });
    }
  };
  return (
    <div className="">
      <div className="bg-black text-white text-center text-3xl font-bold h-16 w-full fixed top-0 left-0 px-4 py-2">
        Auth Page
      </div>
      <br />
      <h1>{login ? "Login" : "Signup"}</h1>
      <br />
      <div className="flex justify-center p-8">
        <span
          onClick={() => setLogin(false)}
          className={`px-10 py-4 bg-gray-100 text-3xl text-black font-bold cursor-pointer hover:bg-gray-200 ${
            !login ? "bg-gray-300" : "bg-gray-100"
          }`}>
          Signup
        </span>
        <span
          onClick={() => setLogin(true)}
          className={`px-10 py-4 bg-gray-100 text-3xl text-black font-bold cursor-pointer hover:bg-gray-200 ${
            login ? "bg-gray-300" : "bg-gray-100"
          }`}>
          Login
        </span>
      </div>
      <br />
      <div className="flex justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e, login ? "login" : "signup")}
          className="border-2 border-gray-900 p-10 rounded-sm  w-[340px]">
          <input
            type="text"
            placeholder="email"
            name="email"
            className="p-4 border-2 border-black my-2 w-full"></input>
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            className="p-4 border-2 border-black my-2 w-full"></input>
          <br />
          <div className="text-base text-red-500">
            <Link to="/forgotPass">Forgot Password?</Link>
          </div>
          <br />
          <button className="p-4 bg-blue-400 w-full text-white cursor-pointer">
            {login ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginSignup;
