import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navigasi from "../web/Navigasi";
import Home from "../web/Home";
import Product from "../web/Product";
import Cartpage from "../web/cart/Cartpage";
import Header from "../web/Header";
import ProductDetail from "../web/page/ProductDetail";
import Login from "../web/log/login";
import { LoginContext } from "../../provider/context/LoginProvider";
import { useContext } from "react";
import Register from "../web/log/Register";
import PaymentForm from "../web/cart/popup/paymentForm"

const MyWeb = () => {
  const NoUser = ({ children }) => {
    const { user } = useContext(LoginContext);
    const location = useLocation();
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  const RequireLogin = ({ children }) => {
    const { user } = useContext(LoginContext);
    const location = useLocation();
    if (user) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
  };

  return (
    <div>
      <Routes>
        <Route path="/payment" element={<PaymentForm/>}/>
        <Route
          path="/register"
          element={
            <RequireLogin>
              <>
                <Register />
              </>
            </RequireLogin>
          }
        />
        <Route
          path="/login"
          element={
            <RequireLogin>
              <>
                <Login />
              </>
            </RequireLogin>
          }
        />
        <Route
          path="/cart"
          element={
            <NoUser>
              <>
                <Header />
                <Cartpage />
              </>
            </NoUser>
          }
        />
        <Route
          path="/"
          element={
            <NoUser>
              <>
                <div className="fixed-top">
                  <Header />
                  <Navigasi />
                </div>
                <Home />
                <Product />
              </>
            </NoUser>
          }
        />
        <Route
          path="/productdetail/:id"
          element={
            <NoUser>
              <>
                <div className="fixed-top">
                  <Header />
                  <Navigasi />
                </div>
                <ProductDetail />
              </>
            </NoUser>
          }
        />
      </Routes>
    </div>
  );
};

export default MyWeb;
