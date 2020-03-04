import React, { useState } from "react";
import moodScale from "../../../data/mood_scale";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const ChartsByMood = ({ clbk, filterByMood, clbkCheck }) => {
  const [sliderValue, setSliderValue] = useState(filterByMood);
  const [movingEgg, setMovingEgg] = useState("46%");
  const leftValue = [
    "0%",
    "10%",
    "19%",
    "28%",
    "37.5%",
    "46.7%",
    "55.7%",
    "65%",
    "74%",
    "83%",
    "92%"
  ];
  const sliderChange = moodscore => {
    setSliderValue(moodscore);
    setMovingEgg(leftValue[moodscore]);
  };

  /*     onClick = {() => {
    clbk("t_good");
    clicked("t_good");
}} */
  return (
    <>
      <div className="filterMood">
        <input type="checkbox" id="filterbymood" onChange={clbkCheck} />{" "}
        <label htmlFor="filterbymood">Filter by mood </label>
      </div>
      <div className="chartsbymood">
        <img
          className="emoji"
          src={moodScale[sliderValue].moodState}
          alt="mood"
          style={{ marginLeft: movingEgg }}
        />
        <div className="slidecontainer">
          <input
            type="range"
            min={0}
            max={10}
            value={sliderValue}
            onChange={e => {
              // console.log(e.target.value);
              clbk(e.target.value);
              sliderChange(e.target.value);
            }}
            className="slider"
          />
        </div>
      </div>
    </>
  );
};

export default ChartsByMood;
