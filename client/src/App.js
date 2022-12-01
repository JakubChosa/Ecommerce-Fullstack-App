import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SharedLayout,
  Landing,
  Products,
  ShoppingCart,
  NotFound,
  Register,
  SingleProduct,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
