import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../context/DataContext';
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

const OrdersList = () => {
    const navigate = useNavigate();
    const { orders, setOrders } = useContext(DataContext);

    const handleProductAction = async (orderId, productId, action) => {
        try {
            const response = await axios.put("http://localhost:8000/order/update", { orderId, productId, action });
            if(response.data.status === "updated"){
                const updatedOrders = orders.map(order => {
                    if(order.id === orderId){
                        const productIndex = order.productIdList.indexOf(productId);
                        if(productIndex !== -1){
                            order.stageList[productIndex] = action;
                        }
                    }
                    return order;
                });
                setOrders(updatedOrders);
            }
            else{
                alert("something went wrong");
            }
        }
        catch (error) {
            console.error(error);    
        }
    }

    return (
        <div className="p-5 font-poppins">
            {orders.map((order) => (
                <div key={order.id} className="border border-gray-300 px-4 pt-4 mb-8 rounded-lg">
                    {/* Order details */}
                    <h2 className="font-balsamiq-sans text-2xl font-bold mb-2">Order ID: {order.id}</h2>
                    <div className="ml-3 space-y-2">
                        <p><span className="font-semibold">Billing Name: </span> &nbsp; {order.billName}</p>
                        <p><span className="font-semibold">Contact No.: </span> &nbsp; {order.billPone}</p>
                        <p><span className="font-semibold">Billing Address: </span> &nbsp; {order.billAddress}</p>
                        <p><span className="font-semibold">Created At: </span> &nbsp;  {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    
                    {/* Order items */}
                    <div className="mt-4">
                        <h3 className="font-balsamiq-sans text-lg font-semibold underline">Order Items:</h3>
                        <div className="flex flex-col my-3">
                            <ol className="">
                                {order.productIdList.map((productId, index) => (
                                    <div>
                                        {/* product detail */}
                                        <div className="grid grid-cols-4 border-b pb-2" key={index}>
                                            <li className="col-span-3 list-decimal ml-5 px-2 content-center">
                                                {order.productNameList[index]}
                                            </li>
                                            <div className="col-span-1 text-end p-2 font-semibold content-center">
                                                ₹ {order.amountList[index]}
                                            </div>
                                        </div>
                                        {/* buttons */}
                                        {order.stageList[index] === "created" &&
                                            <div className="my-4">
                                                <button onClick={() => handleProductAction(order.id, productId, 'approved')} className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded mr-2">
                                                    APPROVE
                                                </button>
                                                <button onClick={() => handleProductAction(order.id, productId, 'rejected')} className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
                                                    REJECT
                                                </button>
                                            </div>
                                        }
                                        {order.stageList[index] === "approved" &&
                                            <div className="my-4 flex">
                                                <button className="bg-green-500 text-white py-1 px-4 rounded mr-2 cursor-default">
                                                    APPROVED
                                                </button>
                                                <div className="ml-2 text-4xl text-green-500">
                                                    <HiCheckCircle />
                                                </div>
                                            </div>
                                        }
                                        {order.stageList[index] === "rejected" &&
                                            <div className="my-4 flex">
                                                <button className="bg-red-500 text-white py-1 px-4 rounded mr-2 cursor-default">
                                                    REJECTED
                                                </button>
                                                <div className="ml-2 text-4xl text-red-500">
                                                    <HiXCircle />
                                                </div>
                                            </div>
                                        }

                                    </div>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrdersList;
