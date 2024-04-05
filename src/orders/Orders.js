import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import OrdersList from './ordersList';

const Orders = () => { 
    const headerLine = "HELLO SELLER, 👨‍💼🛒";

    return (
        <div>
            <Header headerLine={headerLine}/>
            <div className="w-full flex justify-around items-center font-poppins font-bold border-y-2 border-black text-2xl lg:text-xl md:text-lg sm:text-base xs:text-sm">
                <Link to="/home/orders" className="w-full bg-[#285F88] text-center shadow-inner text-white border-r-2 border-black p-2">
                    ORDERS
                </Link>
                <Link to="/home/products" className="w-full bg-[#DEEEF7] text-center shadow-inner p-2">
                    PRODUCTS
                </Link>
            </div>
            <div className="px-6">
                <OrdersList />
            </div>

        </div>
    )
}

export default Orders
