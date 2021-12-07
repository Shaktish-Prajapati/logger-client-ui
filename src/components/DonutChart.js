import React, { PureComponent, useState, useCallback } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const visibleName =
    payload.logType.charAt(0).toUpperCase() + payload.logType.slice(1);
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  // fill={fill}
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={
          visibleName == "Error"
            ? "red"
            : visibleName == "Debug"
            ? "yellow"
            : visibleName == "Verbose"
            ? "blue"
            : visibleName == "Warn"
            ? "green"
            : "black"
        }
      >
        {visibleName}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={
          visibleName == "Error"
            ? "red"
            : visibleName == "Debug"
            ? "yellow"
            : visibleName == "Verbose"
            ? "blue"
            : visibleName == "Warn"
            ? "green"
            : "black"
        }
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={
          visibleName == "Error"
            ? "red"
            : visibleName == "Debug"
            ? "yellow"
            : visibleName == "Verbose"
            ? "blue"
            : visibleName == "Warn"
            ? "green"
            : "black"
        }
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={
          visibleName == "Error"
            ? "red"
            : visibleName == "Debug"
            ? "yellow"
            : visibleName == "Verbose"
            ? "blue"
            : visibleName == "Warn"
            ? "green"
            : "black"
        }
        fill="none"
      />
      <circle
        cx={ex}
        cy={ey}
        r={2}
        fill={
          visibleName == "Error"
            ? "red"
            : visibleName == "Debug"
            ? "yellow"
            : visibleName == "Verbose"
            ? "blue"
            : visibleName == "Warn"
            ? "green"
            : "black"
        }
        stroke="none"
      />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        // fill="#333"
        fill={
          visibleName == "Error"
            ? "red"
            : visibleName == "Debug"
            ? "yellow"
            : visibleName == "Verbose"
            ? "blue"
            : visibleName == "Warn"
            ? "green"
            : "black"
        }
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const DonutChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  // const [activeIndex, setactiveIndex] = useState(0)
  const getLogCountsReducer = useSelector((state) => state.getLogCountsReducer);
  const { data } = getLogCountsReducer;
  const piCount =
    data && data.data && data.data.typeWiseCount
      ? data.data.typeWiseCount
      : null;
  // console.log(data.data.typeWiseCount)

  return (
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={piCount}
        paddingAngle={5}
        //   namekey='logType'
        cx={200}
        cy={200}
        innerRadius={50}
        outerRadius={80}
        fill="#1F80F8"
        dataKey="count"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
};

export default DonutChart;
