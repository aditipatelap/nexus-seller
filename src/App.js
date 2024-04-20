import React, { useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Login from "./account/Login";
import ForgotPassword from "./account/ForgotPassword";
import DataFetch from "./account/DataFetch";
import Auth from "./account/Auth";
import Verification from "./account/Verification";
import Register from "./account/Register";
import Main from "./profile/Main";
import Orders from "./orders/Orders";
import Products from "./products/Products";
import ProductPage from "./products/ProductPage";
import EditProduct from "./products/EditProduct";
import NewProduct from "./products/NewProduct";

function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}


function App() {
  const [verificationCode, setVerificationCode] = useState(null);

  return (
    <div className="App">
      <DataProvider>
        <div className="flex flex-col min-h--screen">
          <Routes>
            <Route path="/" element={<ScrollToTop> <Login /> </ScrollToTop>} />
            <Route path="/forgot-password" element={<ScrollToTop> <ForgotPassword /> </ScrollToTop>} />
            <Route path="/dataFetch" element={<ScrollToTop><DataFetch /></ScrollToTop>} />
            <Route path="/signup" element={<ScrollToTop> <Auth setVerificationCode={setVerificationCode} /> </ScrollToTop>} />
            <Route path="/verification" element={<ScrollToTop><Verification verificationCode={verificationCode} /></ScrollToTop>} />
            <Route path="/register" element={<ScrollToTop> <Register /> </ScrollToTop>} />
            <Route path="/profile" element={<ScrollToTop> <Main /> </ScrollToTop>} />
            <Route path="/home/orders" element={<ScrollToTop> <Orders /> </ScrollToTop>} />
            <Route path="/home/products" element={<ScrollToTop> <Products /> </ScrollToTop>} />
            <Route path="/home/products/:id" element={<ScrollToTop> <ProductPage /> </ScrollToTop>} />
            <Route path="/home/products/edit/:id" element={<ScrollToTop> <EditProduct /> </ScrollToTop>} />
            <Route path="/home/products/new" element={<ScrollToTop> <NewProduct /> </ScrollToTop>} />
          </Routes>
        </div>
        <div className="w-full header-background font-poppins font-normal text-center">
          <p className="text-gray-900 bg-blue-100 text-sm md:text-xs sm:text-xs xs:text-[10px] py-1">© 2024 NEXUS E-RETAIL LIMITED All Rights Reserved.</p>
        </div>
      </DataProvider>
    </div>
  );
}

export default App;
