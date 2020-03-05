import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFastForward } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Collapse from "../components/tracker/Collapse";
import "../styles/tracker.css";

import moodScale from "../data/mood_scale";
import APIHandler from "../api/APIHandler";

const TrackMood = ({ history }) => {
  const [sliderValue, setSliderValue] = useState(5);
  const [colorValue, setColorValue] = useState("");
  const [tags, setTags] = useState([]);
  const [btnClicked, setClicked] = useState(false);
  const [toEdit, setEdit] = useState(false);
  const [{day, mood, k_good, k_bad}, setData] = useState({day:"", mood:"", k_good:[], k_bad:[]});

  const updateTags = (val) => {
    setTags(val)
  }

  useEffect(() => {
    APIHandler.get("/daymood")
    .then(res => {
      if (res.data.length == 0) return;
      console.log("res is here", res.data)
      const { day, mood, k_good, k_bad } = res.data[0];

      console.log(day)
      setSliderValue(Number(mood))

      //setData({...res.data[0]});
      
      //if (res.data) setEdit(true)
      setEdit(true)
    })
    .catch(err => console.error(err))

    return () => {}
  }, [])

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
    setClicked(true); // disables button once clicked
    e.preventDefault();
    const newMood = {tags: tags, intensity: sliderValue}
    APIHandler.post("/daymood/new", newMood)
    .then(res => {
      history.push("/dashboard"); // redirects to dashboard
    })
    .catch(err => console.error(err))
  }

  // fetch data and display on daymood/edit

  return (
    <>
    <div className="moodpage" style={{backgroundColor:"#fff"}}>
      <p className="date">{format(new Date(), "'Today is' PPPP")}</p>
      { !!toEdit ? (
        <h1>Today you are feeling...</h1>
      ) : (
        <h1>How are you feeling?</h1>
      )}
        <form className="form" onSubmit={handleSubmit}>
          <img className="emoji" src={moodScale[sliderValue].moodState} alt="mood"/>
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
          <Collapse 
            clbk={updateTags}
          />

          { !toEdit && (
          <button
            style={btnClicked ? {backgroundColor: "#fff", borderColor:colorValue} : {backgroundColor:colorValue}}
            className= "btn-ok"
            disabled={btnClicked}
          >
            {btnClicked ? "Saved !" : <FontAwesomeIcon icon={faCheck} />}
          </button>
          )}
        </form>
    </div>
    </>
  );
};

export default withRouter(TrackMood);
