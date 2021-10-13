import React,{useState,useEffect} from 'react'
import Navbarr from './Navbarr'
import './LogTable.css'
import * as IoIcons from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectByCode } from '../action/ProjectAction'
import SpinLoader from './support/SpinLoader'




const LogTable = () => {

    const [tabel, setRefresh] = useState('')
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code')
    const dispatch = useDispatch()
    const getAllLogByCodeReducer = useSelector(state => state.getAllLogByCodeReducer)
    const {loading, data} = getAllLogByCodeReducer
    console.log(code)

    const refreshButton = ()=>{
        dispatch(getProjectByCode(code))
    }

    useEffect(() => {
        dispatch(getProjectByCode(code))
    }, [])

    const myFunction = () => {
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        var rows = table.getElementsByTagName("tr");
        for (i = 1; i < rows.length; i++) {
          var cells = rows[i].getElementsByTagName("td");
          var j;
          var rowContainsFilter = false;
          for (j = 0; j < cells.length; j++) {
            if (cells[j]) {
              if (cells[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                rowContainsFilter = true;
                continue;
              }
            }
          }
      
          if (! rowContainsFilter) {
            rows[i].style.display = "none";
          } else {
            rows[i].style.display = "";
          }
        }
      }

    return (
        <>
        <Navbarr />
        <div style={{overflowX: 'auto', marginLeft:'12%'}}>
            <IoIcons.IoIosRefreshCircle onClick={refreshButton} style={{height:'40px',width:'40px', color:'#3E8BE2', float:'right',marginRight:'10px',marginTop:'10px'}} />

        <table id="myTable" className="table-style">
        <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Search here.."/>
        
        <tr>
            <th>Mac Add</th>
            <th>Log Msg</th>
            <th>Log Type</th>
            <th>Model Type</th>
            <th>Model ID</th>
            <th>Log Created On</th>
        </tr>
        
        {/* <tr>
            <td>10:20:aF:29</td>
            <td>Need Maintanance</td>
            <td>Warning</td>
            <td>AgVa Mini</td>
            <td>002</td>
            <td>10 OCT 2021</td>
        </tr> */}
        { loading ? <SpinLoader /> :
            data && data.data && data.data.logs.map((obj,idx)=> {
            return <tr key={idx}>
            <td >{obj.did}</td>
            <td>{obj.logMsg}</td>
            <td>{obj.logType}</td>
            <td>{obj.device_types.split("|")[1]}</td>
            <td>{obj.device_types.split("|")[0]}</td>
            <td>{obj.createdAt}</td>
        </tr>}

            )

        
        }



        </table>
        </div>

        </>
    )
}

export default LogTable
