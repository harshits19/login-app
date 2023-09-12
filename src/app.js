import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Body from "./Body";
import LoginSignup from "./Signup";
import ForgotPass from "./ForgotPass";

const root = ReactDOM.createRoot(document.getElementById("root"));

/* Step 1
Setup different routes for login and home pages
*/
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginSignup />,
      },
      {
        path: "/forgotPass",
        element: <ForgotPass />,
      },
    ],
  },
]);

root.render(<RouterProvider router={appRouter} />);
