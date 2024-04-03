import React from "react";
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Login from "./account/Login";
import DataFetch from "./account/DataFetch";
import Auth from "./account/Auth";
import Register from "./account/Register";
import Main from "./profile/Main";
import Orders from "./orders/Orders";
import Products from "./products/Products";
import ProductPage from "./products/ProductPage";
import EditProduct from "./products/EditProduct";
import NewProduct from "./products/NewProduct";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <div className="flex flex-col min-h--screen">
          <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/dataFetch" element={<DataFetch />} />
            <Route path="/signup" element={ <Auth /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/profile" element={ <Main /> } />
            <Route path="/home/orders" element={ <Orders /> } />
            <Route path="/home/products" element={ <Products /> } />
            <Route path="/home/products/:id" element={ <ProductPage /> } />
            <Route path="/home/products/edit/:id" element={ <EditProduct /> } />
            <Route path="/home/products/new" element={ <NewProduct /> } />
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
