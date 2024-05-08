import axios from "axios";

const API_URL = "http://localhost:8080"; // Update this with your actual backend URL

export const loginUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/loginUser`, {
      user_id: userId,
    });
    console.log(response.data.courses);
    return response.data.courses;
  } catch (error) {
    throw error;
  }
};

export const getItemRecommendations = async (courseId) => {
  try {
    const response = await axios.post(`${API_URL}/api/item`, {
      course_id: courseId,
    });
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
