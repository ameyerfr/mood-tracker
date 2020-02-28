import React, { useState, useEffect, useReducer } from "react";
import Keywords from "../components/Keywords";
import "../styles/tracker.css";

import moodScale from "../data/mood_scale";

const TrackMood = () => {
  const [sliderValue, setSliderValue] = useState(5);
  const [colorValue, setColorValue] = useState("");

  useEffect(() => {
    setColorValue(changeBackground(sliderValue))
  })

  const handleChange = e => {
    setSliderValue(+e.target.value)
  }

  const changeBackground = (range) => {
    const moodColors = [
      "#8faaea",
      "#a6abee",
      "#bdadef",
      "#d3aeef",
      "#e7afec",
      "#f2f2f2",
      "#ffb1e6",
      "#ffb0d0",
      "#ffb2ba",
      "#ffb7a9",
      "#ffbe9d"]
    
    // DARKER: 
    // const moodColors = [
    //   "#0064a2",
    //   "#4a69aa",
    //   "#6f6eaf",
    //   "#8e73b1",
    //   "#a879b1",
    //   "#fff",
    //   "#d38bac",
    //   "#e397aa",
    //   "#efa4a9",
    //   "#f8b3aa",
    //   "#ffc2ad"
    // ]
    return moodColors[range]
  }

  return (
    <div className="moodpage" style={{backgroundColor:colorValue}}>
      <h1>Hi, how are you feeling today?</h1>
      <form className="form">
        <h2>{sliderValue}</h2>
        <div className="slidecontainer">
          <input
            type="range"
            min={0}
            max={10}
            value={sliderValue}
            className="slider"
            onChange={handleChange}
          />
        </div>
        <div>
        <Keywords title="positive" />
        <Keywords title="negative" />
        </div>
        <button className="btn-ok">OK</button>
      </form>
      
    </div>
  );
};

export default TrackMood;
