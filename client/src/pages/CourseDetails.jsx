import React from "react";
import { DisplayCourses, Navbar } from "../components";
import { Sidebar } from "../components";
import { useUser } from "../context/userContext";
import { c1, c10, c14, tagType, thirdweb } from "../assets";
import { useLocation } from "react-router-dom";

const CourseDetails = () => {
  //   const { state } = useLocation();
  const { items, displayItem } = useUser();
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full mx-auto sm:pr-5">
        <div>{<Navbar />}</div>
        <div className="w-[82vw] h-[80vh] rounded-xl mb-20 flex justify-center align-middle">
          <div
            className="sm:w-[700px] p-5 w-full h-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
            onClick={() => {}}
          >
            <img
              src={displayItem[0].image}
              alt="fund"
              className="w-full h-[300px] object-cover rounded-[15px]"
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
                <h3 className="font-epilogue font-semibold text-[20px] text-white text-left leading-[26px] ">
                  {displayItem[0].title}
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
                <p className="flex-1 font-epilogue font-normal text-[14px] text-[#808191] truncate">
                  by{" "}
                  <span className="text-[#b2b3bd]">
                    {displayItem[0].author}
                  </span>
                </p>
              </div>
              <div className="mt-[20px]">
                <h4 className="font-epilogue font-semibold text-[20px] text-white ">
                  Course Description
                </h4>

                <div className="mt-[15px]">
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    {
                      "This course covers essential concepts with practical exercises to reinforce learning. Perfect for beginners and professionals alike, join us to gain the skills needed."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DisplayCourses
          title="Recommended Courses"
          isLoading={false}
          courses={items}
          //   campaigns={campaigns}
        />
      </div>
    </div>
  );
};

export default CourseDetails;
