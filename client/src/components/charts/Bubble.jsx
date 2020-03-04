import React, { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import dataBubbleTest from "../../data/test_bubble_data";
import { subDays, format } from "date-fns";
let moodData;
//import ReactBubbleChart from "react-bubble-chart";

const Bubble = ({ dateRange }) => {
  let dateToday = format(new Date(), "yyyyMMdd");
  let dateLastWeek = format(subDays(new Date(), 7), "yyyyMMdd");

  const [moodScore, setMoodScore] = useState("all");
  const [keywordsType, setKeywordsType] = useState("both");

  const [moodKeywords, setMoodKeywords] = useState([]);

  /*   const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fetchStartDate, setFetchStartDate] = useState(dateLastWeek);
  const [fetchEndDate, setFetchEndDate] = useState(dateToday); */

  const [mood, setMood] = useState(0);

  useEffect(() => {
    APIHandler.get(`/daymood/keywords/${moodScore}/${dateRange}?`)
      .then(moods => {
        setMood(moods.data);
      })
      .catch(err => console.log(err));
  }, [dateRange]);

  useEffect(() => {
    moodData = [];
    for (let key in mood.k_good) {
      moodData.push({
        value: Number(mood.k_good[key]),
        label: key,
        color: "#E7C9C9"
      });
    }
    for (let key in mood.k_bad) {
      moodData.push({
        value: Number(mood.k_bad[key]),
        label: key,
        color: "#D3D8E2"
      });
    }
    console.log(moodData);
    setMoodKeywords(moodData);
  }, [mood]);
  /*   bubbleClick = label => {
    console.log("Custom bubble click func");
  };
  legendClick = label => {
    console.log("Customer legend click func");
  }; */
  return (
    <>
      {moodKeywords && (
        <>
          {console.log(dateRange)}
          <BubbleChart
            graph={{
              zoom: 1,
              offsetX: 0,
              offsetY: 0
            }}
            width={300}
            height={500}
            padding={0} // optional value, number that set the padding between bubbles
            showLegend={false} // optional value, pass false to disable the legend.
            legendPercentage={20} // number that represent the % of with that legend going to use.
            legendFont={{
              family: "Arial",
              size: 12,
              color: "#000",
              weight: "bold"
            }}
            valueFont={{
              family: "Arial",
              size: 12,
              color: "#fff",
              weight: "bold"
            }}
            labelFont={{
              family: "Arial",
              size: 12,
              color: "#fff",
              weight: "bold"
            }}
            //Custom bubble/legend click functions such as searching using the label, redirecting to other page
            // bubbleClickFunc={this.bubbleClick}
            // legendClickFun={this.legendClick}
            data={moodKeywords}
          />
        </>
      )}
    </>
  );
};

export default Bubble;
