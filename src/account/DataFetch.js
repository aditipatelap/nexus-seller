import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../context/DataContext';

const DataFetch = () => {
    const navigate = useNavigate();
    const { productsList, setProducts } = useContext(DataContext);

    const getData = async () => {
        const response = await axios.post("https://nexus-backend-380o.onrender.com/product/get", { productsList });
        setProducts(response.data.products);
    }

    useEffect(() => {
        getData();    
        navigate("/home/orders");
    }, []);


    return (
        <div>
            fetching details....
        </div>
    )
}

export default DataFetch
