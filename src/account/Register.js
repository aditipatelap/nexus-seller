import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DataContext from '../context/DataContext';
import { statesList, districtsList } from '../dataLists';

const Register = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const logoPath = process.env.PUBLIC_URL + "/images/logo/logo_3x.png";
  const { 
    setSellerId,
    sellerName, setSellerName,
    email, setEmail,
    password, setPassword,
    phoneNumber, setPhoneNumber,
    building, setBuilding,
    landmark, setLandmark,
    area, setArea,
    district, setDistrict,
    state, setState,
    setProductsList, setOrdersList,

  } = useContext(DataContext);

  const [ sellerNameError, setSellerNameError ] = useState('');
  const [ buildingError, setBuildingError ] = useState('');
  const [ landmarkError, setLandmarkError ] = useState('');
  const [ areaError, setAreaError ] = useState('');
  const [ PhoneNumberError, setPhoneNumberError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ validPassword, setValidPassword ] = useState(false);

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
    setSellerId(seller._id);
    setSellerName(seller.name);
    setEmail(seller.email);
    setPassword(seller.password);
    setPhoneNumber(seller.phoneNumber);
    setBuilding(seller.building);
    setLandmark(seller.landmark);
    setArea(seller.area);
    setDistrict(seller.district);
    setState(seller.state);
    setProductsList(seller.productsList);
    setOrdersList(seller.ordersList);
  }

  const handleRegister = async () => {

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
      const response = await axios.post(`${URL}/seller/register`, data);
      if(response.data.status === "added") {
        alert("Thank you for registering");
        handleSellerData(response.data.user);
        navigate("/home/products");
      }
      else if (response.data.status === "fail") {
        alert("Something went wrong");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex flex-col m-5'>
      {/* logo */}
      <div className="w-full flex justify-center">
        <div className="mb-8 h-28 w-28 md:h-24 md:w-24 sm:h-24 sm:w-24 xs:h-20 xs:w-20">
          <img src={logoPath} alt="Nexus" className="h-full w-full object-contain" />
        </div>
      </div>
      {/* pickup line */}
      <p className="font-balsamiq-sans font-semibold text-center text-xl mb-8 w-full">
          We love to join with you. Please, fill the below details.
      </p>
      <form id="registerPage" action="POST" onSubmit={(e) => e.preventDefault()}>
        <div className="w-full px-5">
            {/* details  */}
            {detailsBunch.map((detail) => (
                <div key={detail.id} className="w-full">
                  {/* put address text before address field */}
                  {detail.id === "building" &&
                    <p className="font-bold md:text-sm sm:text-sm xs:text-xs mb-2">Address:</p>
                  }
                  {/* show the details based on their type */}
                  <div className="flex flex-row mb-3 md:text-sm sm:text-sm xs:text-xs">
                    <div className="w-full ml-2">
                      {detail.type === "select" &&
                        <div>
                          <p className="w-full mb-2 font-medium">{detail.placeholder}:</p>
                          <select
                            id={detail.id}
                            value={detail.value}
                            required
                            className="border-2 rounded-md border-gray-300 px-2"
                            onChange={(e) => detail.method(e.target.value)}
                            style={{ width: '100%', maxWidth: '100%' }}
                          >
                            {detail.id === "state" &&
                              statesList.map((state) => (
                                <option key={state} value={state}>{state}</option>
                              ))
                            }

                            {detail.id === "district" &&
                              districtsList[state].map((district) => (
                                <option key={district} value={district}>{district}</option>
                              ))
                            }
                          </select>
                        </div>
                      }
                      {detail.type === "text" &&
                        <div>
                          <div className="flex justify-start w-full h-full mb-1">
                            <p className="mr-3 font-medium">{detail.placeholder}:</p>
                          </div>
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
                          {/* error msg */}
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

        {/* button  */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="font-podkova bg-[#285F88] rounded-md p-4 px-10 sm:px-6 xs:px-6 hover:shadow-lg hover:shadow-slate-400 text-center text-white text-2xl sm:text-xl xs:text-xl font-semibold"
            onClick={() => handleRegister()}
          >
            LET's GO
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
