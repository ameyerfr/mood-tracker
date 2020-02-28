import React from "react";
import ResponsiveCalendar from "../components/charts/ResponsiveCalendar";
import Bubble from "../components/charts/Bubble";

const Stats = () => {
  return (
    <section className="section">
      <h1 className="title">Your moods</h1>
      <div className="container">
        {/* <ResponsiveCalendar /> */}
        <Bubble />
      </div>
    </section>
  );
};

export default Stats;
