import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "./firebaseConfig";
const ForgotPass = () => {
  const navigate = useNavigate();
  const handleEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendPasswordResetEmail(database, email)
      .then(() => {
        alert("Check your Inbox, a verification email has been sent");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.code);
      });
  };
  return (
    <div>
      <div className="bg-black text-white text-center text-3xl font-bold h-16 w-full fixed top-0 left-0 px-4 py-2 relative">
        <span className="absolute left-4 top-4 text-base cursor-pointer">
          <Link to="/login">Login</Link>
        </span>
        <span>Reset Password</span>
      </div>

      <div className="flex items-center justify-center pt-20">
        <form
          onSubmit={(e) => handleEmail(e)}
          className=" border-2 border-gray-900 py-5 px-10 rounded-sm  w-[340px]">
          <div className="text-xl font-semibold mt-4">Enter Email</div>
          <input
            type="text"
            name="email"
            placeholder="email"
            className="p-4 border-2 border-black my-4 w-full"
          />
          <button className="p-4 bg-blue-400 w-full text-white cursor-pointer">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPass;
