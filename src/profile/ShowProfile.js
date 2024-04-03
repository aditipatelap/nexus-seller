import React, { useContext } from 'react';
import DataContext from '../context/DataContext';

const ShowProfile = ({ handleEditClick }) => {
    const { 
        sellerName, email, password, phoneNumber, 
        building, landmark, area, district, state,
    } = useContext(DataContext);
    
    const detailsBunch = [
        { id: "sellerName", value: sellerName, placeholder: "Name" },
        { id: "email", value: email, placeholder: "Email" },
        { id: "password", value: password, placeholder: "Password" },
        { id: "phoneNumber", value: phoneNumber, placeholder: "Phone Number" },
        // address 
        { id: "building", value: building, placeholder: "Building no. & name" },
        { id: "landmark", value: landmark, placeholder: "Landmark" },
        { id: "area", value: area, placeholder: "Area/Street" },
        { id: "state", value: state, placeholder: "State" },
        { id: "district", value: district, placeholder: "District" },
      ];
    
    return (
        <div>
            {/* show details  */}
            <div className="w-full">
                {detailsBunch.map((detail) => (
                    <div key={detail.id}>
                        {/* put address text before address field */}
                        {detail.id === "building" && 
                            <p className="font-bold md:text-sm sm:text-sm xs:text-xs mb-2 ">Address:</p>
                        }
                        <div className="flex flex-col justify-center mb-6 md:text-sm sm:text-sm xs:text-xs">
                            <label htmlFor={detail.id} className="text-nowrap font-semibold">{detail.placeholder}:</label>
                            {detail.id === "password" &&
                                <p className="border-b-2 border-gray-300 mt-1 px-2 break-words">********</p>
                            }
                            {detail.id !== "password" &&
                                <p className="border-b-2 border-gray-300 mt-1 px-2 break-words">{detail.value}</p>
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* button for edit details  */}
            <button 
            className="px-20 py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 rounded-lg shadow-lg font-podkova bg-sky-900 text-white text-2xl md:text-xl sm:text-xl xs:text-xl"
            onClick={handleEditClick}
            >
                EDIT
            </button>
        </div>
    );
};

export default ShowProfile;
