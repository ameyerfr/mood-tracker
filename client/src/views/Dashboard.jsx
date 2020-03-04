import React from "react";
import "../styles/main.css";
import "../styles/dashboard.css"

import DashLink from "../components/DashLink";
import PetModule from "../components/pet/PetModule"

const Dashboard = () => {
  return (
    <div className="page page-dashboard flex-center-column">
      <div className="content-wrapper flex-center-column">

        <div className="pet-wrapper">
          <PetModule />
        </div>

        <DashLink
          title="Track Mood Today"
          page="/daymood/new"
          classN="new"
        />
        <DashLink
          title="See Stats"
          page="/stats"
          classN="stats"
        />
        <DashLink
          title="Add Buddies"
          page="/contacts"
          classN="contacts"
        />

      </div>
    </div>
  )
};

export default Dashboard;
