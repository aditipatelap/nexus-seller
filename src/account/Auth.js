import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import axios from "axios";

const Auth = ({ setVerificationCode }) => {
    const URL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const logoPath = process.env.PUBLIC_URL + "/images/logo/logo_3x.png";
    const { 
        setSellerId, setSellerName, email, setEmail, setPassword, setPhoneNumber, 
        setBuilding, setLandmark, setArea, setDistrict, setState, 
        setProductsList, setOrdersList,
    } = useContext(DataContext);

    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        setSellerId();
        setSellerName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setBuilding('');
        setLandmark('');
        setArea('');
        setDistrict("Ahmadabad");
        setState("Gujarat");
        setProductsList([]);
        setOrdersList([]);
    }, []);

    const handleSignup = async () => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check if the entered email is valid
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await axios.post(`${URL}/seller/auth`, { email });
            if(response.data.status === "exist"){
                setEmail('');
                alert("User already exist");
                navigate("/");
            }
            else if (response.data.status === "notexist") {
                setVerificationCode(response.data.code);
                navigate("/verification");
            }
            else if (response.data.status === "fail") {
                alert("Something went wrong");
            }
        }
        catch (error) {
            console.error(error);    
        }
    };

    // Function to handle email input change
    const handleEmailChange = (e) => {
        // Clear the email error when input field changes
        setEmailError('');
        // Update the email state
        setEmail(e.target.value);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h--screen'>
             <div className="border-2 border-black rounded-lg pt-5 pb-14 px-32 sm:px-7 xs:px-5 mx-5 bg-[#98CDEA]">
                {/* logo */}
                <div className="w-full flex justify-center">
                    <div className="h-28 w-28 md:h-24 md:w-24 sm:h-24 sm:w-24 xs:h-20 xs:w-20">
                        <img src={logoPath} alt="Nexus" className="h-full w-full object-contain"/>
                    </div>
                </div>
                {/* pickup line */}
                <h1 className="font-balsamiq-sans font-semibold text-2xl md:text-xl sm:text-xl xs:text-lg text-center mt-5 mb-2">WELCOME</h1>
                <p className="font-balsamiq-sans mb-10 text-center">
                    Create an account & join before it's too late
                </p>
                {/* form  */}
                <form id="loginPage" action="POST" onSubmit={(e) => e.preventDefault()}>
                    <div className='w-full border-black shadow-md mb-3'>
                        <label htmlFor={email} className="text-nowrap mr-5 hidden">Email Id:</label>
                        <input 
                            id="email"
                            required
                            autoFocus
                            // autoComplete='off'
                            type="email"
                            className='w-full rounded-md font-poly placeholder-slate-300 text-white p-3 text-lg bg-[#285F88]'
                            placeholder="Enter Your Email ID"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    {/* Show error message if email is invalid */}
                    {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
                    {/* terms Checkbox  */}
                    <div className="flex items-center mb-3 mt-5">
                        <input 
                            id="termsCheckbox"
                            type="checkbox" 
                            className="mr-4 w-5 h-5"
                            required
                            checked
                        />
                        <label htmlFor="termsCheckbox" className="font-poppins font-light">
                                Yes, I accept <a href="/" className="underline hover:text-blue-600">terms and conditions</a>.
                        </label>
                    </div>
                    {/* notification Checkbox  */}
                    <div className="flex items-center mb-3">
                        <input 
                            id="notiCheckbox"
                            type="checkbox" 
                            className="mr-4 w-5 h-5"
                        />
                        <label htmlFor="notiCheckbox" className="font-poppins font-light">
                            Yes, I want notification of future offers and updates.
                        </label>
                    </div>
                    <div className="flex justify-center">
                        <button 
                            type="submit"
                            className="font-podkova bg-[#285F88] rounded-md mt-5 p-4 px-10 sm:px-6 xs:px-6 mb-8 hover:shadow-lg hover:shadow-slate-400 text-center text-white text-2xl sm:text-xl xs:text-xl font-semibold"
                            onClick={() => handleSignup()}
                        >
                            CONTINUE
                        </button>
                    </div>
                </form>
                <div className="flex w-full justify-center sm:text-sm xs:text-sm">
                    <Link to='/' className='underline hover:text-blue-600 font-poppins text-sm'>
                        have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Auth
