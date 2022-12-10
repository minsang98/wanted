import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const getHeaders = () => {
  const headers = {
    headers: {
      Authorization: localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
  };
  return headers;
};

export const createTodo = async (data) => {
  try {
    const headers = getHeaders();
    const res = axios.post(`${SERVER_URL}/todos`, data, headers);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getTodos = async () => {
  try {
    const headers = getHeaders();
    const res = axios.get(`${SERVER_URL}/todos`, headers);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (id, data) => {
  try {
    const headers = getHeaders();
    const res = axios.put(`${SERVER_URL}/todos/${id}`, data, headers);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (id) => {
  try {
    const headers = getHeaders();
    const res = axios.delete(`${SERVER_URL}/todos/${id}`, headers);
    return res;
  } catch (err) {
    console.log(err);
  }
};
