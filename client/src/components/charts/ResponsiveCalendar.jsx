import React from "react";
import ReactDOM from "react-dom";
import { Calendar } from "nivo";
import dataTest from "../../data/test_date_data";

const data = [...dataTest];

//console.log(data);

const from = new Date(2019, 0, 1);
const to = new Date(2019, 11, 31);
const commonProps = {
  width: 350,
  height: 900,
  margin: {
    top: 50,
    right: 10,
    bottom: 10,
    left: 50
  },
  from: from.toISOString(),
  to: to.toISOString(),
  data,
  direction: "vertical"
};

const ResponsiveCalendar = () => {
  return <Calendar {...commonProps} />;
};

export default ResponsiveCalendar;
