import React, { createContext, useState } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [sellerId, setSellerId] = useState();
    const [sellerName, setSellerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // address
    const [building, setBuilding] = useState('');
    const [landmark, setLandmark] = useState('');
    const [area, setArea] = useState('');
    const [district, setDistrict] = useState("Ahmadabad");
    const [state, setState] = useState("Gujarat");

    const [productsList, setProductsList] = useState([]);
    const [ordersList, setOrdersList] = useState([]);

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    
    return (
        <DataContext.Provider value={{
            sellerId, setSellerId,
            sellerName, setSellerName,
            email, setEmail,
            password, setPassword,
            phoneNumber, setPhoneNumber,
            building, setBuilding,
            landmark, setLandmark,
            area, setArea,
            district, setDistrict,
            state, setState,
            productsList, setProductsList,
            ordersList, setOrdersList,
            products, setProducts,
            orders, setOrders,
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;