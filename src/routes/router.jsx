import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddExport from "../pages/AddExport";
import MyExports from "../pages/MyExports";
import MyImports from "../pages/MyImports";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      { path: "/all-products", element: <AllProducts /> },

      // ✅ Requirement অনুযায়ী Product Details Private (assignment doc এ আছে)
      { path: "/products/:id", element: <PrivateRoute><ProductDetails /></PrivateRoute> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      { path: "/add-export", element: <PrivateRoute><AddExport /></PrivateRoute> },
      { path: "/my-exports", element: <PrivateRoute><MyExports /></PrivateRoute> },
      { path: "/my-imports", element: <PrivateRoute><MyImports /></PrivateRoute> },
    ],
  },
]);

export default router;
