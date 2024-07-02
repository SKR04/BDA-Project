import axios from "axios";
// require("dotenv");
import dotenv from "dotenv";

dotenv.config();
const API_URL = process.env.API_URL; // Update this with your actual backend URL
console.log(API_URL);

export const loginUser = async (userId) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/loginUser`,
      {
        user_id: userId,
      },
      {
        headers: {
          Authorization: "",
        },
      }
    );
    console.log(response.data.courses);
    return response.data.courses;
  } catch (error) {
    throw error;
  }
};

export const getItemRecommendations = async (courseId) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/item`,
      {
        course_id: courseId,
      },
      {
        Authorization: "",
      }
    );
    console.log(response.data.courses);
    return response.data.courses;
  } catch (error) {
    throw error;
  }
};

export const searchCourses = async (query) => {
  try {
    console.log(query.Category);
    const response = await axios.post(`${API_URL}/api/search`, {
      Category: query.Category,
      Language: query.Language,
      Level: query.Level,
      Subtitle: query.Subtitle,
    });
    return response.data.courses;
  } catch (error) {
    throw error;
  }
};
