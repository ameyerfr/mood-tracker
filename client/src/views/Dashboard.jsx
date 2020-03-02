import React from "react";
import "../styles/main.css";
import DashLink from "../components/DashLink";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Hi there</h1>
      <div className="pet-container">THERE IS A PET HERE</div>
      <DashLink 
        title="Track Mood Today"
        page="/daymood/new"
        color="#FF9AA2"
      />
      <DashLink 
        title="See Stats"
        page="/statistics"
        color="#E2F0CB"
      />
      <DashLink 
        title="Add Buddies"
        page="/contacts"
        color="#C7CEEA"
      />
    </div>
  )
};

export default Dashboard;
