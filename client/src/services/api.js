// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default api;

const API_BASE_URL = "http://localhost:5000"; // Ensure this matches your backend

const api = {
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Server error" }));
      throw new Error(errorData.message || "Request failed");
    }

    return response.json();
  },

  get: async (endpoint, headers = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { method: "GET", headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Server error" }));
      throw new Error(errorData.message || "Request failed");
    }

    return response.json();
  },
};

export default api;
