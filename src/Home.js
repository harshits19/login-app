import { database } from "./firebaseConfig";
import { signOut } from "firebase/auth";

const Home = () => {
  const handleSignOut = () => {
    signOut(database).then((val) => {
      console.log(val, "sign outed");
    });
  };

  const user = database?.currentUser;
  return (
    <div>
      Home
      <div className="bg-black text-white h-12 w-full fixed top-0 left-0 px-4 py-2">
        <div className="flex center-items justify-between">
          <p onClick={() => handleSignOut()} className={`cursor-pointer`}>
            Signout
          </p>
        </div>
      </div>
      <div className="p-10 text-2xl text-center font-semibold">
        <div className="my-2">Welcome user - {user?.email}</div>
        <div className="my-2">
          {user?.emailVerified
            ? "You are verified."
            : "Please verify your Email."}
        </div>
      </div>
    </div>
  );
};
export default Home;
