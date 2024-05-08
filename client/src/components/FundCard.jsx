import React from "react";
import { useUser } from "../context/userContext";

import { tagType, thirdweb } from "../assets";
import { authors } from "../constants";
import { getItemRecommendations } from "../api/api";
import {
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  c8,
  c9,
  c10,
  c11,
  c12,
  c13,
  c14,
} from "../assets";
import { useNavigate } from "react-router-dom";
// import { daysLeft } from '../utils';

const FundCard = ({ title, description, author, image }) => {
  const { items, setItems, displayItem, setDisplayItem } = useUser();
  const navigate = useNavigate();

  const handleGetItems = async (title) => {
    console.log(title);

    const itemNames = await getItemRecommendations(title);
    const itemsArray = Object.entries(itemNames).map(([key, value]) => ({
      id: key, // Using the key as the ID or any unique identifier
      title: value,
      author: getRandomAuthor(),
      image: getRandomImage(),
    }));
    const displayDetails = {
      title: title,
      author: author,
      image: image,
    };
    setDisplayItem([displayDetails]);
    console.log(displayDetails);

    setItems(itemsArray);
    console.log(itemsArray);
    navigate("/course-details");
  };
  const getRandomAuthor = () => {
    const randomIndex = Math.floor(Math.random() * authors.length);
    return authors[randomIndex];
  };
  const images = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14];
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imgVal = images[randomIndex];
    images.splice(randomIndex, 1);
    return imgVal;
  };

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={() => handleGetItems(title, image, author)}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[120px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[5px]">
          {/* <img
            // src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          /> */}
          {/* <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Education
          </p> */}
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] ">
            {title}
          </h3>
          {/* <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p> */}
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[25px] h-[25px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[13px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{author}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
