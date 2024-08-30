import "./App.css";
import { useAccount } from "wagmi";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Router/Route";
import Home from "./Components/Home";
import { Toaster } from "react-hot-toast";
import { useMemo, useRef } from "react";
import Reward from "./Components/Reward";
import Tokens from "./Components/Tokens";
import Protocol from "./Components/Protocol";
import Dashboard from "./Components/Dashboard/Dashboard";
import FaqsFinal from "./Components/FaqsFinal";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const { chain } = useAccount();
  const { address } = useAccount();
  const firstRender = useRef(true);

  useMemo(() => {
    window.localStorage.setItem("refresh", "false");
    if (window.ethereum)
      if (firstRender.current) {
        firstRender.current = false;
        return;
      } else {
        window.location.reload(true);
      }
  }, [chain?.id, address]);
     
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "reward",
          element: <Reward />,
        },
        {
          path: "tokens",
          element: <Tokens />,
        },

        {
          path: "protocol",
          element: <Protocol />,
        },
        {
          path: "faq",
          element: <FaqsFinal />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
