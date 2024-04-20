import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const ForgotPassword = () => {
    const URL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const logoPath = process.env.PUBLIC_URL + "/images/logo/logo_3x.png";
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleForgot = async () => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await axios.post(`${URL}/seller/forgot-pass`, { email });
            setEmail('');
            const { data } = response;
            if (data.status === "sent") {
                alert("We have sent you a mail for login credentials.")
                navigate("/");
            } else if (data.status === "notexist") {
                alert("User has not signed up");
                navigate("/signup");
            } else if (data.status === "fail") {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(''); // Clear error message when email input changes
    };

    return (
        <div className="flex flex-col items-center justify-center h-dvh">
            <div className="border-2 border-black rounded-lg w-2/5 pt-5 pb-14 px-10 sm:px-7 xs:px-5 mx-5 bg-[#98CDEA]">
                {/* logo */}
                <div className="w-full flex justify-center">
                    <div className="h-28 w-28 md:h-24 md:w-24 sm:h-24 sm:w-24 xs:h-20 xs:w-20">
                        <img src={logoPath} alt="Nexus" className="h-full w-full object-contain" />
                    </div>
                </div>
                {/* pickup line */}
                <p className="font-balsamiq-sans font-semibold text-xl md:text-lg sm:text-lg xs:text-base mt-5 mb-10 text-center">
                    Enter the email address associated with your account, we'll send you a mail with your credentials.
                </p>
                {/* form  */}
                <form id="forgotpassword" action="POST" onSubmit={(e) => e.preventDefault()}>
                    <div className='w-full border-black shadow-md mb-2'>
                        <label htmlFor={email} className="text-nowrap mr-5 hidden">Email Id:</label>
                        <input
                            id="email"
                            autoFocus
                            type="email"
                            className='w-full rounded-md font-poly placeholder-slate-300 text-white p-3 text-lg bg-[#285F88]'
                            placeholder="Email ID"
                            value={email}
                            onChange={handleEmailChange} // Use handleEmailChange to update email and clear error
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex mt-7">
                        <button
                            type="submit"
                            className="font-podkova bg-[#285F88] rounded-md p-4 px-10 sm:px-6 xs:px-6 mb-8 hover:shadow-lg hover:shadow-slate-400 text-center text-white text-2xl sm:text-xl xs:text-xl font-semibold"
                            onClick={() => handleForgot()}
                        >
                            ENTER
                        </button>
                    </div>
                </form>
                <div className="flex w-full justify-center sm:text-sm xs:text-sm">
                    <Link to='/signup' className='underline hover:text-blue-600 font-poppins text-sm'>
                        Don’t have an account? No Worries!
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
