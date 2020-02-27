import React from "react";
import "../styles/main.css";
import DashLink from "../components/dashboard/DashLink";

const Dashboard = () => {
  return (
    <div>
      <h1>Hi there</h1>
      <div className="pet-container">THERE IS A PET HERE</div>
      <DashLink 
        title="Track Your Mood"
        page="/tracker"
        color="#c5c8ff"
      />
      <DashLink 
        title="See Your Stats"
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
