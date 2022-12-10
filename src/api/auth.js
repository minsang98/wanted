import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const headers = { headers: { "Content-Type": "application/json" } };
export const postSignup = async (data) => {
  try {
    const res = await axios.post(`${SERVER_URL}/auth/signup`, data, headers);
    if (res)
      localStorage.setItem("access_token", `Bearer ${res.data.access_token}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const postLogin = async (data) => {
  try {
    const res = await axios.post(`${SERVER_URL}/auth/signin`, data, headers);
    if (res)
      localStorage.setItem("access_token", `Bearer ${res.data.access_token}`);
    return res;
  } catch (err) {
    if (err.response.status === 404) {
      return alert("회원정보가 일치하지 않습니다");
    } else console.log(err);
  }
};
