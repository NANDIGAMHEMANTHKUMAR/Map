// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [cards, setCards] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get('/dashboard').then(setCards).catch(() => navigate('/login'));
//   }, [navigate]);

//   return (
//     <div>
//       {cards.map(card => <div key={card.id} onClick={() => navigate(`/map?cardId=${card.id}`)}>Card {card.id}</div>)}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [cards] = useState(["Card 1", "Card 2", "Card 3"]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/dashboard", { headers: { Authorization: token } });
        setMessage(response.data.message);
      } catch (error) {
        setMessage("User not logged in");
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      {cards.map((card, index) => (
        <button key={index} onClick={() => navigate("/mapview")}>
          {card}
        </button>
      ))}
    </div>
  );
};

export default Dashboard;
