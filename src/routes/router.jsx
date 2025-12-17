import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div className="p-10 text-white">404 Not Found</div>,
    children: [
      { path: "/", element: <Home /> },

      // এগুলো এখন placeholder, পরে full page বানাবো
      { path: "/products", element: <div className="text-white">All Products Page</div> },
      { path: "/my-imports", element: <div className="text-white">My Imports (Private)</div> },
      { path: "/my-exports", element: <div className="text-white">My Exports (Private)</div> },
      { path: "/add-export", element: <div className="text-white">Add Export (Private)</div> },
      { path: "/login", element: <div className="text-white">Login Page</div> },
      { path: "/register", element: <div className="text-white">Register Page</div> },
    ],
  },
]);

export default router;
