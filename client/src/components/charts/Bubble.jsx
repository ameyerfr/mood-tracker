import React from "react";
import ReactDOM from "react-dom";
import BubbleChart from "@weknow/react-bubble-chart-d3";
import dataBubbleTest from "../../data/test_bubble_data";

//import ReactBubbleChart from "react-bubble-chart";

const Bubble = () => {
  /*   bubbleClick = label => {
    console.log("Custom bubble click func");
  };
  legendClick = label => {
    console.log("Customer legend click func");
  }; */
  return (
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
      data={dataBubbleTest}
    />
  );
};

export default Bubble;
