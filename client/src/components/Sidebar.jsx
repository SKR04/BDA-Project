import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";

let mw1, mw2;

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Icon
        styles="w-[52px] h-[52px] bg-[#2c2f32]"
        imgUrl={logo}
        onClick={() => handleClick()}
      />

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (link.name == "payment") {
                  if (mw1 && !mw1.closed) mw1.focus;
                  else
                    window.open(
                      "https://thirdweb.com/goerli/0x9b9F52875392A484fED6f45fE8D5FC8F26a2fC22/explorer"
                    );
                  // window.open('https://thirdweb.com/goerli/0x038d9783D354b9E9c438b118728B2B86E4abBb24/explorer');
                }
                if (link.name === "withdraw") {
                  window.open("https://portfolio.metamask.io/");
                }
                if (link.name === "logout") {
                  alert("Logout using your Metamask");
                }
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
