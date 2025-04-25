// import React, { useState } from "react";
// import api from "../services/api"; // Ensure this file exists

// const Login = () => {
//   const [isRegister, setIsRegister] = useState(false); // Toggle Login/Register
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     name: "",
//     gender: "Male", // Matches database column
//   });
//   const [message, setMessage] = useState("");

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Form Submit (Login/Register)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const endpoint = isRegister ? "/register" : "/login"; // Correct API route
//       const response = await api.post(endpoint, formData);
//       setMessage(response.message || (isRegister ? "Registration successful!" : "Login successful!"));
//     } catch (error) {
//       setMessage(error.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           {isRegister ? "Register" : "Login"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {isRegister && (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </>
//           )}

//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <button
//             type="submit"
//             className="w-full p-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"
//           >
//             {isRegister ? "Sign Up" : "Login"}
//           </button>
//         </form>

//         {message && <p className="text-center text-red-500 mt-2">{message}</p>}

//         <p className="text-center mt-4 text-gray-600">
//           {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
//           <button
//             onClick={() => setIsRegister(!isRegister)}
//             className="text-blue-500 font-semibold"
//           >
//             {isRegister ? "Login" : "Sign up"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "", name: "", gender: "male" });
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "/register" : "/login";  // FIXED ENDPOINT
    try {
      const response = await api.post(endpoint, formData);
      setMessage(response.message);  // FIXED RESPONSE HANDLING
      if (!isRegistering) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        {isRegistering && <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />}
        {isRegistering && (
          <select name="gender" onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        )}
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      {message && <p>{message}</p>}
      <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: "pointer", color: "blue" }}>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </p>
    </div>
  );
};

export default Login
