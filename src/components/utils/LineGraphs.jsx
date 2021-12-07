import React from 'react'
import { useSelector } from 'react-redux';
import {
    XAxis, 
    YAxis,
    AreaChart,
    Area,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    ReferenceLine 
  } from 'recharts';

const graphdata = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];


function LineGraphs() {
    const getLogCountsByDateReducer = useSelector(state => state.getLogCountsByDateReducer)
    const {data} = getLogCountsByDateReducer
    const LineCount = data && data.data && data.data.response  ? data.data.response : null
    console.log(LineCount)
    return (
        <ResponsiveContainer width={'100%'} height={370}>
        <AreaChart data={LineCount}
        // width={700} height={500}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {/* <ReferenceLine x="Page C" stroke="green" label="Min PAGE" /> */}
          {/* <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" /> */}
          <Area type="monotone" dataKey="countLog" stroke="#3E8BE2" fill="#D3E5F9" />
        </AreaChart>
      </ResponsiveContainer>
    )
}

export default LineGraphs
