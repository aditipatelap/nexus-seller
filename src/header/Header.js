import React from 'react';
import { Link } from 'react-router-dom';
import { MdAccountCircle, MdLogout } from "react-icons/md";

const Header = ({headerLine}) => {
  const logoPath = process.env.PUBLIC_URL + "/images/logo/logo_3x.png";

  return (
    <header className="max-w-full px-6 py-2 h-fit bg-[#deeef7] text-white flex items-center justify-between">
        {/* Logo */} 
        <Link to="/home/orders" className="w-8 h-8 sm:h-10 sm:w-10 md:h-11 md-w-11 lg:h-12 lg:w-12 xl:h-14 xl:w-14 2xl:h-20 2xl:w-20">
            <img src={logoPath} alt="Nexus" className="h-full w-full object-contain"/>
        </Link>
        <p className="text-[#3F3939] font-bold font-poppins text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs">{headerLine}</p>
        {/* profile icon*/}
        <div className="space-x-3 flex justify-center">
            <Link to="/profile" title="Profile">
                <MdAccountCircle className="text-[#3F3939] text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl" />
            </Link>
            <Link to="/" title="Logout">
                <MdLogout className="text-[#3F3939] text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"/>
            </Link>

        </div>
    </header>
  )
}

export default Header;
