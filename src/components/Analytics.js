import React, {useState, useEffect,useCallback} from 'react'
import Navbarr from './Navbarr'
import './Analytics.css'
import { faHome, faWrench, faDatabase, faPlus, faArrowCircleRight, faSignOutAlt, faUserAlt, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import {getLogTypeCounts,getLogByDate} from '../action/ProjectAction'
import SpinLoader from './support/SpinLoader'
import {Col,Card, Row, Dropdown,DropdownButton} from 'react-bootstrap'
import PieCharts from './PieChart';
import LineGraphs from './LineGraphs';
import { multiSelectFilter } from 'react-bootstrap-table2-filter';
import DonutChart from './DonutChart';

function Analytics() {

  const [date, setdate] = useState({
    start:null,
    end:null
  })
  
  const filterOnDate=({startDate=null,endDate=null,diff=null})=>{
    console.log(diff)
    if (diff != null) {
      var dt = new Date();
      const endd = dt.toISOString().slice(0, 10)
      console.log(date)
      dt.setDate(dt.getDate() - diff)
      setdate({start:dt.toISOString().slice(0, 10),end:endd})
      console.log(date)
    }else{
      console.log('Does not execute')
    }
  }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code')
    const projectName = urlParams.get('name')

    const navbardetail = {
        name: projectName,
        dashName:projectName,
        link1:{
            iconName:faDatabase,
            linkName:'Logs',
            link:`/newlogTable?code=${code}&name=${projectName}`
        },
        link2:{
            iconName:faChartPie,
            linkName:'Analytics',
            link:`/analytics?code=${code}&name=${projectName}`
        }
  
    }
    const dispatch = useDispatch()

    const dispatchmultiple = ()=>{
      dispatch(getLogTypeCounts(code))
      dispatch(getLogByDate(code,date))
    }
    useEffect(() => {
       dispatchmultiple()
    }, [date])
    return (
      <>
      <Navbarr navbardetails = {navbardetail}  />
        <div style={{ width:'85%', float:'right', paddingTop:'50px'}}>
          <Row> 
            <Col sm={4} >
              <PieCharts />
                </Col>
                <Col sm={4} >
                    <PieCharts />
                </Col>
                <Col sm={4} >
                  {/* <PieCharts /> */}
                  <DonutChart />
                </Col>
                </Row>
                <Row style={{marginTop:'2%',marginBottom:'2%'}} >
                <div className="col"  >
                  <label style={{color:'#3E8BE2',fontWeight:'bold',float:'left'}} >Start date 
                  <input type="date" value={date.start} onChange={e=>setdate({...date,start:e.target.value})} className="form-control" style={{color:'#3E8BE2',fontWeight:'bold',float:'left'}} />
                  </label>
                </div>
                <div className="col"  >
                  <label style={{color:'#3E8BE2',fontWeight:'bold',float:'left'}} >End date 
                  <input type="date" max={Date.now} value={date.end} onChange={e=>setdate({...date,end:e.target.value})} className="form-control" style={{color:'#3E8BE2',fontWeight:'bold',float:'left'}} />
                  </label>
                </div>
                <div class="col">
                  <DropdownButton id="dropdown" title="Select duration" style={{marginTop:'6%'}} bg="light" >
                    {/* <Dropdown.Item onClick={()=>{setdate({start:Date.now, end:Date().setDate(Date.now - 3)})}}>3 Days</Dropdown.Item> */}
                    <Dropdown.Item onClick={()=>filterOnDate({diff:5})}>5 Days</Dropdown.Item>
                    <Dropdown.Item onClick={()=>filterOnDate({diff:7})}>Week</Dropdown.Item>
                    <Dropdown.Item onClick={()=>filterOnDate({diff:30})}>Month</Dropdown.Item>
                  </DropdownButton>
                </div>
                </Row>
                <Row style={{width:'96%', marginLeft:'.5%'}} >
                  <Col className="analyticsFillChart" >
                    <LineGraphs />
                  </Col>
                </Row>
        </div>
            
        </>
    )
}

export default Analytics
