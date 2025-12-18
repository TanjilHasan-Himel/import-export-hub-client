import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyImports from "../pages/MyImports";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-products", element: <AllProducts /> },

      // ✅ Details PUBLIC (login ছাড়া open হবে)
      { path: "/products/:id"// element: <ProductDetails /> 

      },

      // ✅ Auth
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // ✅ Private
      { path: "/my-imports", element: <PrivateRoute><MyImports /></PrivateRoute> },
    ],
  },
]);

export default router;
