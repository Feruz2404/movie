import React from "react";
import logo from "@/assets/images/logo.svg";
import active_header1 from "@/assets/images/header1-active.svg";
import header2 from "@/assets/images/header2.svg";
import header3 from "@/assets/images/header3.svg";
import header4 from "@/assets/images/header4.svg";

const lang = [
  {
    label: "Eng",
    value: "en",
  },
  {
    label: "Ru",
    value: "ru",
  },
  {
    label: "Uz",
    value: "uzb",
  },
];

const Header = () => {
  return (
    <div className="bg-black text-white">
      <div className="container flex flex-wrap items-center justify-around py-4">
        {/* Logo */}
        <div className="w-[112px] h-[36px]">
          <img className="w-full h-full" src={logo} alt="Logo" />
        </div>
        {/* Navigation */}
        <ul className="flex w-[300px] flex-wrap justify-between">
          <li className="flex flex-wrap flex-col items-center cursor-pointer">
            <img src={active_header1} className="w-6 h-6" alt="Home" />
            <span className="text-primary">Home</span>
          </li>
          <li className="flex flex-wrap flex-col items-center cursor-pointer">
            <img src={header2} className="w-6 h-6" alt="Movies" />
            <span className="text-gray-400">Movies</span>
          </li>
          <li className="flex flex-wrap flex-col items-center cursor-pointer">
            <img src={header3} className="w-6 h-6" alt="Tickets" />
            <span className="text-gray-400">Tickets</span>
          </li>
          <li className="flex flex-wrap flex-col items-center cursor-pointer">
            <img src={header4} className="w-6 h-6" alt="Search" />
            <span className="text-gray-400">Search</span>
          </li>
        </ul>
        {/* Action buttons */}
        <div className="flex gap-4 items-center">
          <select className="h-full bg-gray-800 px-3 py-2 rounded-md text-white">
            {lang.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <button className="w-[180px] h-[56px] bg-red-600 text-white py-3 rounded-md hover:bg-red-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
