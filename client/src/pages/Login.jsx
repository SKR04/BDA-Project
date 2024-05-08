import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { loginUser } from "../api/api";
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

const Login = () => {
  const navigate = useNavigate();
  const { userId, setUserId, setCourses } = useUser();
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSignin = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true);
  };

  const handleSignin = async () => {
    const courseNames = await loginUser(userId);
    setUserId(userId);
    const courses = courseNames.map((courseName) => ({
      title: courseName,
      author: getRandomAuthor(),
      image: getRandomImage(),
    }));
    setCourses(courses);
    navigate("/home");
    console.log("Signed In with user ID:", userId);
    console.log("Courses are", courses);
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
    <div className="flex justify-center items-center h-screen text-center 1C1C24">
      <div className="max-w-md w-full px-4 py-8 bg-[#1C1C24] shadow-lg rounded-lg border-[#1dc0713a] border-2">
        <h2 className="text-2xl mb-4 font-semibold text-white">
          {isLogin ? "Login" : "Register"}
        </h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSignin}
          className="w-full bg-[#1dc071] hover:bg-[#1dc05e] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-[#34a66f]"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600">
            {isLogin ? "New user?" : "Existing User?"}{" "}
          </span>
          <button
            onClick={handleLoginSignin}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isLogin ? "Register here" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
