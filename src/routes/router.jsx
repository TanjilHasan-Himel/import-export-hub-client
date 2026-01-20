import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddExport from "../pages/AddExport";
import MyExports from "../pages/MyExports";
import MyImports from "../pages/MyImports";
import DashboardHome from "../pages/DashboardHome";
import DashboardProfile from "../pages/DashboardProfile";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import FAQ from "../pages/FAQ";
import Help from "../pages/Help";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/all-products", element: <AllProducts /> },
      { path: "/products/:id", element: <PrivateRoute><ProductDetails /></PrivateRoute> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blog", element: <Blog /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/help", element: <Help /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "profile", element: <DashboardProfile /> },
      { path: "my-exports", element: <MyExports /> },
      { path: "add-export", element: <AddExport /> },
      { path: "my-imports", element: <MyImports /> },
    ],
  },
]);

export default router;
