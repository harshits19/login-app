import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { database } from "./firebaseConfig";

const Body = () => {
  //To protect the routes and check if user is logged in/or not
  const navigate = useNavigate();
  useEffect(() => {
    const subscribe = onAuthStateChanged(database, (user) => {
      if (user) {
        navigate("/");
        console.log("Logged In user info:   ", user);
      } else {
        navigate("/login");
      }
    });
    return () => subscribe();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};
export default Body;
