import React, { useState } from "react";

const ChartsByDate = ({ clbk }) => {
  const [activeClass, setActiveClass] = useState("last7");
  const clicked = val => {
    setActiveClass(val);
  };
  return (
    <div className="buttons has-addons">
      <div
        className={
          activeClass === "last7"
            ? "button is-info is-small"
            : "button is-small"
        }
        onClick={() => {
          clbk("last7");
          clicked("last7");
        }}
      >
        last 7 days
      </div>
      <div
        className={
          activeClass === "last30"
            ? "button is-info is-small"
            : "button is-small"
        }
        onClick={() => {
          clbk("last30");
          clicked("last30");
        }}
      >
        last 30 days
      </div>
      <div
        className={
          activeClass === "last365"
            ? "button is-info is-small"
            : "button is-small"
        }
        onClick={() => {
          clbk("last365");
          clicked("last365");
        }}
      >
        last 365 days
      </div>
      <div
        className={
          activeClass === "alldate"
            ? "button is-info is-small"
            : "button is-small"
        }
        onClick={() => {
          clbk("alldate");
          clicked("alldate");
        }}
      >
        All
      </div>
    </div>
  );
};

export default ChartsByDate;
