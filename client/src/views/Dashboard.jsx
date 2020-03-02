import React from "react";
import "../styles/main.css";
import DashLink from "../components/DashLink";

const Dashboard = () => {
  return (
    <div>
      <h1>Hi there</h1>
      <div className="pet-container">THERE IS A PET HERE</div>
      <DashLink 
        title="Track Mood Today"
        page="/daymood/new"
        color="#c5c8ff"
      />
      <DashLink 
        title="See Stats"
        page="/statistics"
        color="#ffc2ad"
      />
      <DashLink 
        title="Add Buddies"
        page="/contacts"
        color="#c8fcea"
      />
    </div>
  )
};

export default Dashboard;
