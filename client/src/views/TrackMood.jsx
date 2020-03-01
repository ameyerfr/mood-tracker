import React, { useState, useEffect, useReducer } from "react";
import Keywords from "../components/Keywords";
import "../styles/tracker.css";

import moodScale from "../data/mood_scale";
import APIHandler from "../api/APIHandler";

const TrackMood = () => {
  const [sliderValue, setSliderValue] = useState(5);
  const [colorValue, setColorValue] = useState("");

  useEffect(() => {
    setColorValue(changeBackground(sliderValue))
  })

  const sliderChange = e => {
    setSliderValue(+e.target.value)
  }

  const changeBackground = (range) => {
     return moodScale[range].bgColor
  }

  const handleSubmit = e => {
    e.preventDefault();

    const moodInfo = {

    }

    APIHandler.post("/daymood/new")
  }

  return (
    <div className="moodpage" style={{backgroundColor:colorValue}}>
      <h1>How are you feeling today?</h1>
      <form className="form" onSubmit={handleSubmit}>
        <img className="emoji" src={moodScale[sliderValue].moodState} />
        <div className="slidecontainer">
          <input
            type="range"
            min={0}
            max={10}
            value={sliderValue}
            onChange={sliderChange}
            className="slider"
          />
        </div>
        <div>
        <Keywords
          title="positive"
          // clbk={}
          />
        <Keywords
          title="negative"
          // clbk={}
        />
        </div>
        <button className="btn-ok">Ok</button>
      </form>
      
    </div>
  );
};

export default TrackMood;
