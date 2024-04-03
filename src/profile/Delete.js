import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataContext from '../context/DataContext';

const Delete = () => {
  const [ textInput, setTextInput ]  = useState("");
  const navigate = useNavigate();
  const { email } = useContext(DataContext);

  const handleDelete = async () => {
    if (textInput === "DELETE") {
      try {
        const response = await axios.delete("http://localhost:8000/seller/delete", { data: { email } });
        if (response.data.status === "deleted") {
          alert("Your Account has been deleted");
          navigate("/");
        }
        else if (response.data.status === "fail") {
          alert("Something went wrong");
      }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="font-poppins mb-8">
      <form id="deleteCustomerDetails" action="POST" onSubmit={(e) => e.preventDefault()}>
        <p className="py-6 sm:py-3 xs:py-3 md:text-sm sm:text-sm xs:text-xs">
          <Link to="/home/orders" className='hover:underline'>Home</Link>
          &nbsp; &gt; &nbsp; 
          <Link to="/profile" className='hover:underline'>Your Account</Link> 
          &nbsp; &gt; &nbsp; 
          <Link to="#" className='hover:underline'>Delete Account</Link> 
        </p>
        <div className="mt-3 md:mt-2 flex flex-col">
          <h1 className="font-balsamiq-sans font-bold text-[#E23232] text-3xl md:text-2xl sm:text-2xl xs:text-2xl border-b-2 border-[#E23232] pl-2 pb-2">DELETE  ACCOUNT</h1>
          <p className="mt-2 text-gray-500 md:text-sm sm:text-xs xs:text-xs">Deleting your account will remove all your information from our database. This cannot be undone.</p>
          <p className="mt-8 text-gray-400 md:text-sm sm:text-xs xs:text-xs">To confirm this, type “DELETE”</p>
          <input 
            type="text"
            required
            value={textInput}
            className="w-96 p-1 md:w-60 sm:w-64 xs:w-60 h-7 mt-3 border rounded-sm border-[#E23232]"
            onChange={(e) => setTextInput(e.target.value) }
          />
          <button 
              type="submit"
              className="font-balsamiq-sans mt-8 px-20 py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 w-fit rounded-lg shadow-md bg-[#E23232] text-white text-2xl md:text-xl sm:text-xl xs:text-xl"
              onClick={() => handleDelete()}
          >
              DELETE
          </button>
        </div>
      </form>
    </div>
  )
}

export default Delete
