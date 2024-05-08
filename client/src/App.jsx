import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Home, CourseDetails } from "./pages";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Sidebar, Navbar } from "./components";
import SearchResults from "./pages/SearchResults";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row align-middle flex-wrap">
      <div className="flex-1 max-sm:w-full  mx-auto sm:pr-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
