import "./style/style.css";
import { BrowserRouter as Router } from "react-router-dom";
import MyWeb from "./components/router/MyWeb";
import { ProductProvider } from "./provider/context/ProductProvider";
import { CategorieProvider } from "./provider/context/ProductProvider";
import { CartProvider } from "./provider/context/CartProvider";
import { LoginProvider } from "./provider/context/LoginProvider";

const App = () => {
  return (
    <>
      <LoginProvider>
        <CartProvider>
          <ProductProvider>
            <CategorieProvider>
              <Router>
                <MyWeb />
              </Router>
            </CategorieProvider>
          </ProductProvider>
        </CartProvider>
      </LoginProvider>
    </>
  );
};

export default App;
