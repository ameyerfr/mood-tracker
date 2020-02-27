import React from "react";
import Keywords from "../components/Keywords";

const TrackMood = () => {
  const [sliderValue, setValue] = useState(5);

  onSliderChange = e => {
    
  }

  changeBackground = () => {

  }

  return (
    <div>
      {/* <h1>Track Your Mood Today</h1> */}
      <div className="slidecontainer">
        <input
          type="range"
          min="0"
          max="10"
          defaultValue="5"
          className="slider"
          onChange={changeBackground}
        />
      </div>

      <Keywords title="What made you feel good today?" />
      <Keywords title="What made you feel bad today?" />
    </div>
  );
};

export default TrackMood;
