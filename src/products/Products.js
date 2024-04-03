import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import ProductsList from './ProductsList';

const Products = () => {
  const headerLine = "HELLO SELLER, 👨‍💼🛒";

  return (
    <div>
      <Header headerLine={headerLine}/>
      <div className="w-full flex justify-around items-center font-poppins font-bold border-y-2 border-black text-2xl lg:text-xl md:text-lg sm:text-base xs:text-sm">
        <Link to="/home/orders" className="w-full text-center shadow-inner p-2 bg-[#DEEEF7] border-r-2 border-black">
          ORDERS
        </Link>
        <Link to="/home/products" className="w-full text-center shadow-inner p-2 bg-[#285F88] text-white">
          PRODUCTS
        </Link>
      </div>
      <div className="px-6" >
        <ProductsList />
      </div>
    </div>
  )
}

export default Products;
