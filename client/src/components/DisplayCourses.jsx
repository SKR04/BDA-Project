import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

import FundCard from "./FundCard";
import { loader } from "../assets";

const DisplayCourses = ({ title, isLoading, courses }) => {
  const navigate = useNavigate();
  // const { courses } = useUser();

  const handleNavigate = (course) => {
    navigate(`/course-details/`, { state: course });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({courses.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && courses.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No Courses Available for your Selection
          </p>
        )}

        {!isLoading &&
          courses.length > 0 &&
          courses.map((course, index) => (
            <FundCard
              title={course.name}
              description={course.description}
              author={course.author}
              img={course.image}
              // key={campaign.id}
              key={`campaign-${index}`}
              {...course}
              handleClick={() => handleNavigate(course)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCourses;
