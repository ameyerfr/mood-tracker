import React, { useState } from "react";

const ChartsByDate = ({ clbk }) => {
  const [activeClass, setActiveClass] = useState("thisweek");
  const clicked = val => {
    setActiveClass(val);
  };
  return (
    <div className="buttons">
      <div
        className={
          activeClass === "thisweek"
            ? "button is-info is-small"
            : "button is-small"
        }
        onClick={() => {
          clbk("thisweek");
          clicked("thisweek");
        }}
      >
        7 days
      </div>
      <div
        className={
          activeClass === "thismonth"
            ? "button is-info is-small"
            : "button is-small"
        }
        onClick={() => {
          clbk("thismonth");
          clicked("thismonth");
        }}
      >
        30 days
      </div>
      <div
        className={
          activeClass === "thisyear"
            ? "button is-info is-small"
            : "button is-small"
        }
        onClick={() => {
          clbk("thisyear");
          clicked("thisyear");
        }}
      >
        365 days
      </div>
      <div
        className={
          activeClass === "thisall"
            ? "button is-info is-small"
            : "button is-small"
        }
        onClick={() => {
          clbk("thisall");
          clicked("thisall");
        }}
      >
        All
      </div>
    </div>
  );
};

export default ChartsByDate;
