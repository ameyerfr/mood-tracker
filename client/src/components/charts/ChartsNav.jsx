import React, { useState } from "react";

const ChartsNav = ({ clbk }) => {
  const [activeClass, setActiveClass] = useState("moodscore");
  const clicked = val => {
    setActiveClass(val);
  };
  return (
    <div className="buttons">
      <div
        className={activeClass === "moodscore" ? "button is-info" : "button"}
        onClick={() => {
          clbk("moodscore");
          clicked("moodscore");
        }}
      >
        Mood
      </div>
      <div
        className={activeClass === "keyword" ? "button is-info" : "button"}
        onClick={() => {
          clbk("keyword");
          clicked("keyword");
        }}
      >
        Keywords
      </div>
    </div>
  );
};

export default ChartsNav;
