import React, { useEffect, useState } from "react";
import Bubble from "../components/charts/Bubble";
import { format, subDays } from "date-fns";
import Calendar from "../components/charts/Calendar";
import ChartsNav from "../components/charts/ChartsNav";
import ChartsByDate from "../components/charts/ChartsByDate";
import ChartsByType from "../components/charts/ChartsByType";

const Stats = () => {
  //default date (lastweek => today)
  let endDate = format(new Date(), "yyyyMMdd");
  let startDate = format(subDays(new Date(), 7), "yyyyMMdd");
  // setting up what to show (default : calendar)
  const [statType, setStatType] = useState("moodscore");

  // filter by date (default : this week)
  const [filterByDate, setFilterByDate] = useState("last7");

  // filter by date (default : this week)
  const [filterByType, setFilterByType] = useState("t_both");

  // date range to send to the components as props (default : from last week to today)
  const [dateRange, setDateRange] = useState(`${startDate}/${endDate}`);

  const handleClick = value => {
    setStatType(value);
  };
  const handleFilterByDate = value => {
    setFilterByDate(value);
  };
  const handleFilterByType = value => {
    setFilterByType(value);
  };

  useEffect(() => {
    if (filterByDate === "alldate") {
      startDate = format(subDays(new Date(), 20000), "yyyyMMdd");
    } else if (filterByDate === "last365") {
      startDate = format(subDays(new Date(), 365), "yyyyMMdd");
    } else if (filterByDate === "last30") {
      startDate = format(subDays(new Date(), 30), "yyyyMMdd");
    } else {
      startDate = format(subDays(new Date(), 7), "yyyyMMdd");
    }
    setDateRange(`${startDate}/${endDate}`);
  }, [filterByDate]);

  return (
    <section className="section">
      <h1 className="title">Your moods</h1>
      <div className="container">
        <ChartsNav clbk={handleClick} />
        {statType !== "moodscore" && <ChartsByDate clbk={handleFilterByDate} />}
        {statType === "moodscore" && <Calendar />}
        {statType === "keyword" && (
          <Bubble dateRange={dateRange} filterByType={filterByType} />
        )}
        {statType !== "moodscore" && <ChartsByType clbk={handleFilterByType} />}
      </div>
    </section>
  );
};

export default Stats;
