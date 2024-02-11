import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8800/v1/api/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchQuestions = () => API.get("/question/");
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/register", formData);
export const fetchUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id,updatedBlog) => API.put(`/user/update/${id}`,updatedBlog)