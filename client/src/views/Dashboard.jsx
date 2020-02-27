import React from "react";
import "../styles/main.css";
import DashLink from "../components/dashboard/DashLink";

const Dashboard = () => {
  return (
    <div>
      <h1>Hi there</h1>
      <div className="pet-container">THERE IS A PET HERE</div>
      <DashLink 
        title="Track"
        page="/tracker"
        color="#c5c8ff"
      />
      <DashLink 
        title="Stats"
        page="/statistics"
        color="#ffc2ad"
      />
      <DashLink 
        title="Buddies"
        page="/contacts"
        color="#c8fcea"
      />
    </div>
  )
};

export default Dashboard;
