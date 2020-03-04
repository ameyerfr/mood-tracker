import React, { useState } from "react";

const ChartsByType = ({ clbk }) => {
  const [activeClass, setActiveClass] = useState("t_both");
  const clicked = val => {
    setActiveClass(val);
  };
  return (
    <div className="buttons has-addons">
      <div
        className={
          activeClass === "t_bad"
            ? "button bad-bg-color  is-selected"
            : "button bad-bg-color "
        }
        onClick={() => {
          clbk("t_bad");
          clicked("t_bad");
        }}
      >
        Bad mood
      </div>
      <div
        className={
          activeClass === "t_both"
            ? "button both-bg-color is-selected"
            : "button both-bg-color "
        }
        onClick={() => {
          clbk("t_both");
          clicked("t_both");
        }}
      >
        Both
      </div>
      <div
        className={
          activeClass === "t_good"
            ? "button good-bg-color is-selected "
            : "button good-bg-color "
        }
        onClick={() => {
          clbk("t_good");
          clicked("t_good");
        }}
      >
        Good mood
      </div>
    </div>
  );
};

export default ChartsByType;
