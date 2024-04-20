import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';

const Verification = ({ verificationCode }) => {
    const logoPath = process.env.PUBLIC_URL + "/images/logo/logo_3x.png";
    const navigate = useNavigate();
    const { email } = useContext(DataContext);
    const [vcode, setVcode] = useState('');
    const [error, setError] = useState('');

    const handleVerification = async () => {
        if (vcode.length !== 6) {
            setError('Verification code should be 6 digits long.');
            return;
        }

        if (vcode === String(verificationCode)) {
            // setError('Verification code is true');
            navigate("/register");
        } else {
            setError('Incorrect verification code');
        }
    }

    const handleChange = (e) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        setVcode(input.substring(0, 6)); // Limit input to first 6 characters
        setError(''); // Clear error message when input changes
    }

    const handlePaste = (e) => {
        e.preventDefault(); // Prevent default paste behavior
    }

    return (
        <div className='flex flex-col items-center justify-center h-dvh m-3'>
            <div className="border-2 border-black rounded-lg max-w-2/5 pt-5 p-14 sm:px-7 xs:px-5 mx-5 bg-[#98CDEA]">
                {/* logo */}
                <div className="w-full flex justify-center">
                    <div className="h-28 w-28 md:h-24 md:w-24 sm:h-24 sm:w-24 xs:h-20 xs:w-20">
                        <img src={logoPath} alt="Nexus" className="h-full w-full object-contain" />
                    </div>
                </div>
                {/* pickup line */}
                <h1 className="font-balsamiq-sans font-semibold text-2xl md:text-xl sm:text-xl xs:text-lg text-center mt-5 mb-2">Verification</h1>
                <p className="font-balsamiq-sans text-center">
                    <p>We have sent you a 6-digit verification code to <span className="font-semibold">{email}</span>.</p>
                    <p>Please check your inbox and paste the code below.</p>
                </p>
                <br />
                {/* form  */}
                <form id="loginPage" action="POST" onSubmit={(e) => e.preventDefault()}>
                    <div className='w-full border-black shadow-md mb-3'>
                        <label className="text-nowrap mr-5 hidden">Verification Code:</label>
                        <input
                            id="code"
                            autoFocus
                            autoComplete="off"
                            type="text"
                            className='w-full rounded-md font-poly placeholder-slate-300 text-white p-3 text-lg bg-[#285F88]'
                            placeholder="Enter Verification Code"
                            value={vcode}
                            onChange={handleChange}
                            onPaste={handlePaste} // Disable paste functionality
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="font-podkova bg-[#285F88] rounded-md mt-5 p-4 px-10 sm:px-6 xs:px-6 mb-8 hover:shadow-lg hover:shadow-slate-400 text-center text-white text-2xl sm:text-xl xs:text-xl font-semibold"
                            onClick={handleVerification}
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

export default Verification;
