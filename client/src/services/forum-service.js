import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getAllForum = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/forum");
    return response.data;
  } catch (error) {
    console.error("Error getting forum:", error);
    throw error;
  }
};

export const getForumById = async (forumId) => {
  try {
    const response = await axios.get(API_BASE_URL + `/forum/${forumId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting quiz by ID:", error);
    throw error;
  }
};
export const createForum = async (userId, forumData) => {
  try {
    const response = await axios.post(
      API_BASE_URL + `/forum/create/${userId}`,
      forumData
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error creating forum:", error);
    throw error;
  }
};
