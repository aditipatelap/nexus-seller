import React, { useContext, useState } from 'react';
import axios from "axios";
import DataContext from '../context/DataContext';
import { statesList, districtsList } from '../dataLists';

const EditProfile = ({ handleEditClick }) => {
    const URL = process.env.REACT_APP_BACKEND_URL;
    const { 
        sellerName, setSellerName,
        email, setEmail,
        password, setPassword,
        phoneNumber, setPhoneNumber,
        building, setBuilding,
        landmark, setLandmark,
        area, setArea,
        district, setDistrict,
        state, setState,
    } = useContext(DataContext);
    
    const [ sellerNameError, setSellerNameError ] = useState('');
    const [ buildingError, setBuildingError ] = useState('');
    const [ landmarkError, setLandmarkError ] = useState('');
    const [ areaError, setAreaError ] = useState('');
    const [ PhoneNumberError, setPhoneNumberError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ validPassword, setValidPassword ] = useState(true);
    
    const detailsBunch = [
        { id: "sellerName", value: sellerName, method: setSellerName, placeholder: "Name", type: "text", maxLength: 50 },
        { id: "email", value: email, method: setEmail, placeholder: "Email", type: "text" },
        { id: "password", value: password, method: setPassword, placeholder: "Password", type: "text" },
        { id: "phoneNumber", value: phoneNumber, method: setPhoneNumber, placeholder: "Phone Number", type: "text" },
      
        // address 
        { id: "building", value: building, method: setBuilding, placeholder: "Building no. & name", type: "text", maxLength: 100 },
        { id: "landmark", value: landmark, method: setLandmark, placeholder: "Landmark", type: "text", maxLength: 100 },
        { id: "area", value: area, method: setArea, placeholder: "Area/Street", type: "text", maxLength: 100 },
        { id: "state", value: state, method: setState, placeholder: "State", type: "select" },
        { id: "district", value: district, method: setDistrict, placeholder: "District", type: "select" },
    ];

    const handleInputChange = (id, value) => {
        switch (id) {
          case "sellerName":
            setSellerName(value);
            setSellerNameError('');
            break;
          case "building":
            setBuilding(value);
            setBuildingError('');
            break;
          case "landmark":
            setLandmark(value);
            setLandmarkError('');
            break;
          case "area":
            setArea(value);
            setAreaError('');
            break;
          case "phoneNumber":
            // Remove non-digit characters
            const input = value.replace(/\D/g, ''); 
            // Limit input to first 10 characters
            const truncatedInput = input.substring(0, 10);
            // Check if the input consists of leading zeros or all zeros
            if (/^0[0-9]*$/.test(truncatedInput) || /^0+$/.test(truncatedInput)) {
                setPhoneNumberError('Invalid phone number');
            } else {
                setPhoneNumber(truncatedInput);
                setPhoneNumberError('');
            }
            break;
          case "password":
            setPassword(value);
            validatePassword(value);
            break;
          default:
              break;
        }
      };
    
      const validatePassword = (password) => {
        if( password.length === 0 ) {
          setPasswordError('');
          return;
        }
        const regexLength = /.{8,}/;
        const regexUppercase = /[A-Z]/;
        const regexLowercase = /[a-z]/;
        const regexNumber = /\d/;
        const regexSpecialChar = /[@$!#%*?&]/;
    
        let isValidLength = regexLength.test(password);
        let hasUppercase = regexUppercase.test(password);
        let hasLowercase = regexLowercase.test(password);
        let hasNumber = regexNumber.test(password);
        let hasSpecialChar = regexSpecialChar.test(password);
    
        // Showing each condition in green only when fulfilled
        setPasswordError(
          <div className="flex flex-col my-1">
            <p className={isValidLength ? 'text-green-500' : 'text-red-500'}>Password must be at least 8 characters long.</p>
            <p className={(hasUppercase && hasLowercase && hasNumber) ? 'text-green-500' : 'text-red-500'}>It contain at least one uppercase letter, one lowercase letter, one number.</p>
            <p className={hasSpecialChar ? 'text-green-500' : 'text-red-500'}>It must contain at least one special character (!, @, #, $, etc.).</p>
          </div>
        );
    
        if(isValidLength && hasUppercase & hasLowercase && hasNumber && hasSpecialChar){
          setValidPassword(true);
        }
        else{
          setValidPassword(false);
        }
    };

    const handleSellerData = (seller) => {
        setSellerName(seller.name);
        setPassword(seller.password);
        setPhoneNumber(seller.phoneNumber);
        setBuilding(seller.building);
        setLandmark(seller.landmark);
        setArea(seller.area);
        setDistrict(seller.district);
        setState(seller.state);
    }


    const handleEditProfile = async () => {
        
        // validation
        if (sellerName.length === 0) {
            setSellerNameError('required*');
            return;
        }
        if (password.length === 0) {
            setPasswordError(
            <div className="flex flex-col ml-1 my-1">
                <p className='text-red-500'>required*</p>
            </div>
            );
            return;
        }
        if (!validPassword){
            return;
        }
        if (phoneNumber.length !== 10) {
            setPhoneNumberError('Phone number must be 10 digits.');
            return;
        }
        if (building.length === 0) {
            setBuildingError('required*');
            return;
        }
        if (landmark.length === 0) {
            setLandmarkError('required*');
            return;
        }
        if (area.length === 0) {
            setAreaError('required*');
            return;
        }

        const data = { sellerName, email, password, phoneNumber, building, landmark, area, district, state };
        
        try {  
            const response = await axios.put(`${URL}/seller/update/profile`, data);
            if(response.data.status === "updated") {
                alert("Your profile has been updated");
                handleSellerData(response.data.user);
                handleEditClick();
            }
            else if (response.data.status === "fail") {
                alert("Something went wrong");
                handleEditClick();
            }
        }
        catch (error) {
            console.error(error);
            handleEditClick();
        }
    }

    return (
        <div>
            <form id="editCustomerDetails" action="POST" onSubmit={(e) => e.preventDefault()}>
                {/* details bunch */}
                <div className="">
                    {detailsBunch.map((detail) => (
                        <div key={detail.id} className="w-full">
                            {/* put address text before address field */}
                            {detail.id === "building" && 
                                    <p className="font-bold md:text-sm sm:text-sm xs:text-xs mb-2 ">Address:</p>
                            }
                            {/* show the details based on their type */}
                            <div className="flex flex-row mb-5 md:text-sm sm:text-sm xs:text-xs">
                                <label htmlFor={detail.id} className="text-nowrap font-semibold">{detail.placeholder}:</label>
                                <div className="w-full ml-2">
                                    {detail.type === "select" &&
                                        <select id={detail.id} value={detail.value} onChange={(e) => detail.method(e.target.value)} className="border-2 rounded-md border-gray-300"  style={{ width: '100%', maxWidth: '100%' }}>
                                            
                                            {detail.id === "state" && 
                                                statesList.map((state) => (
                                                    <option value={state}>{state}</option>
                                                    ))
                                            }
                                            {detail.id === "district" &&
                                                districtsList[state].map((district) => (
                                                    <option value={district}>{district}</option>
                                                ))
                                            }
                                        </select>
                                    }
                                    {detail.type === "text"  &&
                                    <div>
                                        <input
                                            id={detail.id}
                                            required
                                            type={detail.type}
                                            placeholder={detail.placeholder}
                                            autoComplete={detail.id === "email" || detail.id === "password" ? "off": "on"}
                                            autoFocus={detail.id === "sellerName"}
                                            className="border-2 rounded-md border-gray-300 px-2 w-full"
                                            value={detail.value}
                                            maxLength={detail.maxLength}
                                            onChange={(e) => handleInputChange(detail.id, e.target.value)}            
                                        />
                                        <div className="ml-1">
                                            {detail.id === "sellerName" && <p className="text-red-500 text-sm">{sellerNameError}</p> }
                                            {detail.id === "password" && <p className="text-sm"> {passwordError} </p> }
                                            {detail.id === "phoneNumber" && <p className="text-red-500 text-sm">{PhoneNumberError}</p> }
                                            {detail.id === "building" && <p className="text-red-500 text-sm">{buildingError}</p> }
                                            {detail.id === "landmark" && <p className="text-red-500 text-sm">{landmarkError}</p> }
                                            {detail.id === "area" && <p className="text-red-500 text-sm">{areaError}</p> }
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* button for edit details  */}
                <button 
                    type="submit"
                    className="px-20 py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 rounded-lg shadow-lg font-podkova bg-sky-900 text-white text-2xl md:text-xl sm:text-xl xs:text-xl"
                    onClick={() => handleEditProfile()}
                >
                    SAVE
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
