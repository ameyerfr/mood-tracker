import React, { useState, useEffect } from "react";
import Keywords from "../components/Keywords";
import "../styles/tracker.css";

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
      "#845ec2",
      "#a178df",
      "#be93fd",
      "#dcb0ff",
      "#faccff",
      "#fff",
      "#c8fcdd",
      "#98dfc9",
      "#65c2b9",
      "#24a5ab",
      "#00889e"
    ]
    return moodColors[range]
  }

  return (
    <div className="moodpage" style={{backgroundColor:colorValue}}>
      {/* <h1>Track Your Mood Today</h1> */}
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
      {/* <Keywords title="What made you feel good today?" /> */}
      {/* <Keywords title="What made you feel bad today?" /> */}
      </div>
    </div>
  );
};

export default TrackMood;
