import React from "react";
import "../styles/main.css";
import "../styles/dashboard.css"

import DashLink from "../components/DashLink";
import PetModule from "../components/pet/PetModule"

const Dashboard = () => {
  return (
<<<<<<< HEAD
    <div className="dashboard">
      <h1>Hi there</h1>
      <div className="pet-container">THERE IS A PET HERE</div>
      <DashLink 
        title="Track Mood Today"
        page="/daymood/new"
        color="#FF9AA2"
=======
    <div className="page-dashboard">

      <div className="pet-container">
        <PetModule isStoreOpen={false} />
      </div>

      <DashLink
        title="Track Mood Today"
        page="/daymood/new"
        classN="new"
>>>>>>> a7349fca06ba239d1b52f074a7f44aa0a8e78e9d
      />
      <DashLink
        title="See Stats"
        page="/statistics"
<<<<<<< HEAD
        color="#E2F0CB"
=======
        classN="stats"
>>>>>>> a7349fca06ba239d1b52f074a7f44aa0a8e78e9d
      />
      <DashLink
        title="Add Buddies"
        page="/contacts"
<<<<<<< HEAD
        color="#C7CEEA"
=======
        classN="contacts"
>>>>>>> a7349fca06ba239d1b52f074a7f44aa0a8e78e9d
      />
    </div>
  )
};

export default Dashboard;
