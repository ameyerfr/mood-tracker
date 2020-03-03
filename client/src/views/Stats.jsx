import React, { useEffect, useState } from "react";
import ResponsiveCalendar from "../components/charts/ResponsiveCalendar";
import Bubble from "../components/charts/Bubble";
import APIHandler from "../api/APIHandler";
import { format, subDays } from "date-fns";
import Calendar from "../components/charts/Calendar";
import ChartsNav from "../components/charts/ChartsNav";
import ChartsByDate from "../components/charts/ChartsByDate";
//const moment = require("moment");

const Stats = () => {
  //default date (lastweek => today)
  let endDate = format(new Date(), "yyyyMMdd");
  let startDate = format(subDays(new Date(), 7), "yyyyMMdd");
  // setting up what to show (default : calendar)
  const [statType, setStatType] = useState("moodscore");

  // filter by date (default : this week)
  const [filterByDate, setFilterByDate] = useState("thisweek");

  // date range to send to the components as props (default : from last week to today)
  const [dateRange, setDateRange] = useState(`${startDate}/${endDate}`);

  const handleClick = value => {
    setStatType(value);
  };
  const handleFilterByDate = value => {
    setFilterByDate(value);
  };

  useEffect(() => {
    if (filterByDate === "thisall") {
      startDate = format(subDays(new Date(), 20000), "yyyyMMdd");
    } else if (filterByDate === "thisyear") {
      startDate = format(subDays(new Date(), 365), "yyyyMMdd");
    } else if (filterByDate === "thismonth") {
      startDate = format(subDays(new Date(), 30), "yyyyMMdd");
    } else {
      startDate = format(subDays(new Date(), 7), "yyyyMMdd");
    }
    setDateRange(`${startDate}/${endDate}`);
  }, [filterByDate]);

  return (
    <section className="section">
      {/*       {dateRange && console.log(dateRange)} */}
      <h1 className="title">Your moods</h1>
      <div className="container">
        <ChartsNav clbk={handleClick} />
        {statType !== "moodscore" && <ChartsByDate clbk={handleFilterByDate} />}
        {statType === "moodscore" && <Calendar />}
        {statType === "keyword" && <Bubble dateRange={dateRange} />}
      </div>
    </section>
  );
};

export default Stats;
