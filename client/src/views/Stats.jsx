import React, { useEffect, useState } from "react";
import ResponsiveCalendar from "../components/charts/ResponsiveCalendar";
import Bubble from "../components/charts/Bubble";
import APIHandler from "../api/APIHandler";
import { format, subDays } from "date-fns";
import Calendar from "../components/charts/Calendar";
//const moment = require("moment");

const Stats = () => {
  //default date
  let dateToday = format(new Date(), "yyyyMMdd");
  let dateLastWeek = format(subDays(new Date(), 7), "yyyyMMdd");

  /*   let dateToday = moment();
  let dateLastWeek = moment().subtract(7, "days");
 */
  const weekRange = [dateToday, dateLastWeek];

  // const [keywordsGood, setKeywordsGood] = useState([]);
  // const [keywordsBad, setKeywordsBad] = useState([]);
  const [mood, setMood] = useState(0);

  useEffect(() => {
    const moodByDate = APIHandler.get("/daymood/20200128/20200203?")
      .then(moods => {
        setMood(moods.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <section className="section">
      <h1 className="title">Your moods</h1>
      <div className="container">
        <Calendar data={mood} />
        {/* <ResponsiveCalendar /> */}
        <Bubble data={mood} />
      </div>
    </section>
  );
};

export default Stats;
