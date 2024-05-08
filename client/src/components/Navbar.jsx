import React, { useState } from "react";
import { search } from "../assets";
import { useUser } from "../context/userContext";
import { searchCourses } from "../api/api";
import { useNavigate } from "react-router-dom";
import { authors } from "../constants";
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

const Navbar = () => {
  const navigate = useNavigate();
  const { searchItems, setSearchItems } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [filters, setFilters] = useState({
    english: false,
    french: false,
    chinese: false,
    portuguese: false,
    german: false,
    japanese: false,
    russian: false,
    arabic: false,
    filter9: false,
    filter10: false,

    // Add more filters as needed
  });
  const [selectedRadio, setSelectedRadio] = useState("");

  const handleSearch = async () => {
    const subtitle = Object.keys(filters)
      .filter((filter) => filters[filter])
      .join(",");
    // Send search term, filters, and selected radio to backend
    if (
      searchTerm !== "" &&
      selectedLanguage !== "" &&
      subtitle !== "" &&
      selectedRadio !== ""
    ) {
      const searchData = {
        Category: searchTerm.toLowerCase(),
        Language: selectedLanguage,
        Level: selectedRadio,
        Subtitle: subtitle,
      };
      console.log("Sending search data:", searchData);
      const searchItemNames = await searchCourses(searchData);
      console.log(searchItemNames);
      let titles = [];
      // for (let i = 0; i < searchItemNames.length; i++) {
      //   let words = searchItemNames[i].split(" ");
      //   let new_words = [];
      //   for (let j = 0; j < words.length; j++) {
      //     let word = words[j];
      //     word.charAt(0) = word.charAt(0).toUpperCase();
      //     console.log(word);
      //     // new_words.push(word);
      //   }
      //   console.log(new_words);
      // }
      // console.log(titles);
      // var titles = [];
      // for (var i in searchItemNames) {
      //   var words = i.split(" ");
      //   words[0][0].toUpperCase();
      //   words.join(" ");
      //   const capitalizedTitle = words.join(" ");
      //   titles = [...titles, capitalizedTitle];
      // }
      // console.log(titles);
      const searchItemsList = searchItemNames.map((i_name) => ({
        title: i_name,
        author: getRandomAuthor(),
        image: getRandomImage(),
      }));
      setSearchItems(searchItemsList);
      navigate("/search-results");
      console.log("Search Items are", searchItems);
    }
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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[600px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] relative">
        <input
          onClick={toggleFilters}
          type="text"
          placeholder="Search for courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        <div
          className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
          onClick={toggleFilters}
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>

        {showFilters && (
          <div className="absolute mt-2 top-full left-0 w-full bg-[#1c1c24] shadow-md rounded-lg border text-white border-gray-200 z-10">
            {/* Filter and Radio section */}
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Level</h3>
                <div className="grid grid-cols-1">
                  <div className="flex items-center flex-row mb-2">
                    <input
                      type="radio"
                      id="radio1"
                      name="radioGroup"
                      value="Beginner"
                      checked={selectedRadio === "Beginner"}
                      onChange={() => handleRadioChange("Beginner")}
                      className="mr-2"
                    />
                    <label htmlFor="radio1">Beginner</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="radio2"
                      name="radioGroup"
                      value="Intermediate"
                      checked={selectedRadio === "Intermediate"}
                      onChange={() => handleRadioChange("Intermediate")}
                      className="mr-2"
                    />
                    <label htmlFor="radio2">Intermediate</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="radio3"
                      name="radioGroup"
                      value="Advanced"
                      checked={selectedRadio === "Advanced"}
                      onChange={() => handleRadioChange("Advanced")}
                      className="mr-2"
                    />
                    <label htmlFor="radio3">Advanced</label>
                  </div>
                  {/* Add more radio buttons here */}
                </div>
                <h3 className="text-lg font-semibold mb-2 mt-2">Language</h3>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="brazilian">Brazilian</option>
                  <option value="french">French</option>
                  <option value="japanese">Japanese</option>
                  <option value="arabic">Arabic</option>
                  <option value="german">German</option>
                  <option value="indonesian">Indonesian</option>
                  <option value="russian">Russian</option>
                </select>
              </div>
              {/* Filters */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Subtitles</h3>
                <div className="grid grid-cols-2">
                  <div className="flex flex-row mb-2">
                    <input
                      type="checkbox"
                      id="filter1"
                      checked={filters.english}
                      onChange={() => handleFilterChange("english")}
                      className="mr-2"
                    />
                    <label htmlFor="filter1">English</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="filter2"
                      checked={filters.french}
                      onChange={() => handleFilterChange("french")}
                      className="mr-2"
                    />
                    <label htmlFor="filter2">French</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="filter3"
                      checked={filters.chinese}
                      onChange={() => handleFilterChange("chinese")}
                      className="mr-2"
                    />
                    <label htmlFor="filter3">Chinese</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="filter4"
                      checked={filters.portuguese}
                      onChange={() => handleFilterChange("portuguese")}
                      className="mr-2"
                    />
                    <label htmlFor="filter4">Portuguese</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="filter5"
                      checked={filters.german}
                      onChange={() => handleFilterChange("german")}
                      className="mr-2"
                    />
                    <label htmlFor="filter5">German</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="filter6"
                      checked={filters.japanese}
                      onChange={() => handleFilterChange("japanese")}
                      className="mr-2"
                    />
                    <label htmlFor="filter6">Japanese</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="filter7"
                      checked={filters.russian}
                      onChange={() => handleFilterChange("russian")}
                      className="mr-2"
                    />
                    <label htmlFor="filter7">Russian</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="filter8"
                      checked={filters.arabic}
                      onChange={() => handleFilterChange("arabic")}
                      className="mr-2"
                    />
                    <label htmlFor="filter8">Arabic</label>
                  </div>
                  {/* Add more filters here */}
                </div>
              </div>
              {/* Radio Buttons */}
            </div>
            {/* End of filter and radio section */}
            <button
              onClick={handleSearch}
              className="w-full bg-[#4acd8d] hover:bg-[#2c7d56] text-white font-semibold py-2 rounded-b-lg focus:outline-none"
            >
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
