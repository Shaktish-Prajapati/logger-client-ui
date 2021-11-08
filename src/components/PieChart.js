import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { BarChart, 
    Bar, 
    Cell, 
    XAxis, 
    YAxis,
    PieChart, 
    Pie, 
    AreaChart,
    Area,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    ReferenceLine,
    Sector 
  } from 'recharts';

import {Col,Card, Row} from 'react-bootstrap'

const piFunction = ()=>{

}
const pidata = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 }
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042",'green'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text
        x={x}
        y={y}
        fill="white"
        // textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{fontSize:'10px'}}
      >
        {`${(percent * 100).toFixed(0)}% `}
        <br/>
        {name}
        
      </text>
    );
  };

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
      name,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {name}
        </text> */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{` ${name} ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={9}
          textAnchor={textAnchor}
          fill="#999"
        >
          {/* {`(Rate ${(percent * 100).toFixed(2)}%)`} */}
        </text>
      </g>
    );
  };

function PieCharts() {
    const [activeIndex, setactiveIndex] = useState(0)
    const getLogCountsReducer = useSelector(state => state.getLogCountsReducer)
    const { data} = getLogCountsReducer
    const piCount = data && data.data && data.data.typeWiseCount ? data.data.typeWiseCount : null

    const onPieEnter = (data, index)=>{
        setactiveIndex(index);
    }

    return (<>
    
    {
        piCount == null ? 'Loading' :
    
        <Card className="analyticsPieChart">
                    {/* <Card.Body className="addProjectButton"> */}
                    <ResponsiveContainer width={'90%'} height={300}>                        
                        <PieChart width={300} height={300} float='left'>
                            {console.log( piCount)}
                            <Pie
                                data={piCount}
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                // cx={200}
                                // cy={200}
                                labelLine={false}
                                label={renderActiveShape}
                                // outerRadius={100}
                                innerRadius={0}
                                outerRadius={50}
                                fill="#8884d8"
                                dataKey="count"
                                nameKey='logType'
                                onMouseEnter={onPieEnter}
                                // label

                                // dataKey="value"
                                // startAngle={180}
                                // endAngle={0}
                                // data={data}
                                // cx="50%"
                                // cy="50%"
                                // outerRadius={80}
                                // fill="#8884d8"
                            >
                                {piCount.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /* fill={
                                    index == 0 ? COLORS[0]:
                                    index ==1 ? COLORS[1] :
                                    index ==2 ? COLORS[2] :
                                    index ==3 ? COLORS[3] : COLORS[4]
                                } */ />
                                // console.log(index)
                                ))}
                            </Pie>
                            </PieChart>
                            {/* <p>loremIpsum</p> */}
                            </ResponsiveContainer>
                    {/* </Card.Body> */}
                    </Card>
    }
    </>
    )
}

export default PieCharts
