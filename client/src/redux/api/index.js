import axios from "axios"

const API = axios.create({baseURL:"http://localhost:8800/"});

export const fetchQuestions = () => API.get("/v1/api/question/")
