import axios from "axios";

export interface User {
  id: string;
  username: string;
  role: "user" | "admin";
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export const authAPI = {
  register: (username: string, password: string, role?: string) =>
    api.post("/register", { username, password, role }),

  login: (username: string, password: string) =>
    api.post("/login", { username, password }),
};

export const tasksAPI = {
  getTasks: (params?: any) => api.get("/tasks", { params }),
  getTask: (id: string) => api.get("/tasks/" + id),
  createTask: (data: any) => api.post("/tasks", data),
  updateTask: (id: string, data: any) => api.put("/tasks/" + id, data),
  deleteTask: (id: string) => api.delete("/tasks/" + id),
};

export default api;
