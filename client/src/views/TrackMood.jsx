import React, { useState, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Collapse from "../components/Collapse";
import "../styles/tracker.css";

import moodScale from "../data/mood_scale";
import APIHandler from "../api/APIHandler";

const TrackMood = () => {
  const [sliderValue, setSliderValue] = useState(5);
  const [colorValue, setColorValue] = useState("");
  const [tags, setTags] = useState([]);

  const updateTags = (val) => {
    // console.log(val)
    setTags(val)
    // setTags([...tags, val[val.length-1]])
  }

  useEffect(() => {
    setColorValue(changeBackground(sliderValue))
  })

  useEffect(()=> {
    console.log("track mood component", tags)
  },[tags])

  const sliderChange = e => {
    setSliderValue(+e.target.value)
  }

  const changeBackground = (range) => {
     return moodScale[range].bgColor
  }

  const handleSubmit = e => {
    e.preventDefault();

    const newPost = {tags: tags, color: colorValue, slider:sliderValue}

    APIHandler.post("/daymood/new", newPost)
  }

  return (
    <div className="moodpage" style={{backgroundColor:"#fff"}}>
      <p className="date">{format(new Date(), "'Today is' PPPP")}</p>
      <h1>How are you feeling?</h1>
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
        <Collapse clbk={updateTags}/>
        {/* <div>
        <Keywords
          title="positive"
          // clbk={}
          />
        <Keywords
          title="negative"
          // clbk={}
        />
        </div> */}
        <button style={{backgroundColor:colorValue, border:colorValue}} className="btn-ok"><FontAwesomeIcon icon={faCheck} /></button>
      </form>
      
    </div>
  );
};

export default TrackMood;
