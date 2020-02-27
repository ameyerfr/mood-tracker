import React from "react";
import Keywords from "../components/Keywords";

const TrackMood = () => {
  return (
    <div>
    <h1>Track Your Mood Today</h1>
      <div className="slidecontainer">
        <input type="range" min="0" max="10" value="5" className="slider" />
      </div>
      <Keywords
        title="What made you feel good today?"
      />
      <Keywords
        title="What made you feel bad today?"
      />
    </div>
  )
};

export default TrackMood;
