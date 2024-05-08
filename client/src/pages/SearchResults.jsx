import React from "react";
import { DisplayCourses, Navbar } from "../components";

import { useUser } from "../context/userContext";
import { Sidebar } from "../components";
const SearchResults = () => {
  const { searchItems } = useUser();
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full mx-auto sm:pr-5">
        <div>{<Navbar />}</div>
        <div>
          <DisplayCourses
            title="Recommended Courses"
            isLoading={false}
            courses={searchItems}
            // courses={coursesArray}
            //   campaigns={campaigns}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
