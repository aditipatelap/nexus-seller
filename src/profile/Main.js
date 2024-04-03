import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header";
import Profile from "./Profile";
import Delete from './Delete';

const Main = () => {
  const [currentPage, setCurrentPage] = useState("profile");
  const navigate = useNavigate();
  const headerLine = "YOUR ACCOUNT 🤩";

  const links = [
    {Page: "Profile", id: "profile"},
    {Page: "Delete Account", id: "delete"},
    {Page: "Sign Out", id: "signout"},
  ];

  const handlePage = (page) => {
    if (page === "signout") {
        navigate("/");
    } 
    else {
        setCurrentPage(page);
    }
  }
  
  return (
    <div>
      <Header headerLine={headerLine}/>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <div className="col-span-1 font-balsamiq-sans w-full border-r-2 border-gray-600">
            <h2 className="font-semibold text-3xl lg:text-2xl md:text-xl sm:text-lg xs:text-base px-6 py-6 sm:py-3 xs:py-3 text-center border-b-2 border-gray-600 sm:border-b-2 xs:border-b-2">YOUR ACCOUNT</h2>
            
            <div className="flex flex-col sm:flex-row xs:flex-row sm:border-b-2 xs:border-b-2 border-gray-600 drop-shadow-lg sm:justify-between">
              {links.map((link) => (
                <p 
                  id={link.id}
                  className={`hover:underline ${currentPage === link.id ? `${currentPage === "delete" ? "bg-[#E23232]" : "bg-[#285f8899]"}` : ""} text-xl lg:text-lg md:text-sm sm:text-sm xs:text-xs px-6 py-3 sm:px-1 xs:px-1 border-b-2 border-gray-600 w-full sm:text-center xs:text-center sm:flex sm:justify-center sm:items-center xs:flex xs:justify-center xs:items-center sm:border-x xs:border-x`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePage(link.id)}
                >
                  {link.Page}
                </p>
              ))}
            </div>

          </div>

          <div className={"col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3 2xl:col-span-4 px-6"}>
              {currentPage === "profile" && <Profile /> }
              {currentPage === "delete" && <Delete/> }
          </div>
          
          {/* Vertical line */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 border-l border-gray-300"></div>

        </div>
      </div>
    </div>
  )
}

export default Main;
