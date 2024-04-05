import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../context/DataContext';

const DataFetch = () => {
    const navigate = useNavigate();
    const { sellerId, productsList, setProducts, ordersList, setOrders } = useContext(DataContext);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.post("https://nexus-backend-380o.onrender.com/product/get", { productsList });
                if (productResponse.data.status === "success") {
                    setProducts(productResponse.data.products);
                    const orderResponse = await axios.post("https://nexus-backend-380o.onrender.com/order/get", { sellerId, ordersList });
                    if (orderResponse.data.status === "success") {
                        setOrders(orderResponse.data.orders);
                        setDataFetched(true);
                        navigate("/home/orders");
                    } else {
                        alert("Something went wrong while fetching orders.");
                    }
                } else {
                    alert("Something went wrong while fetching products.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Something went wrong.");
            }
        };

        if (!dataFetched) {
            fetchData();
        }
    }, [dataFetched, navigate, ordersList, productsList, sellerId, setOrders, setProducts]);

    return (
        <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
            {dataFetched ? "Data fetched successfully." : "Fetching details..."}
        </div>
    );
};

export default DataFetch;
