import React, {useState, useEffect} from 'react'
import Navbarr from './Navbarr'
// import ProjectSideBar from './ProjectSideBar'
import './NewLogTable.css'
import BootstrapTable from "react-bootstrap-table-next"
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import { faHome, faWrench, faCopy, faPlus, faArrowCircleRight, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import {getProjectByCode} from '../action/ProjectAction'
import SpinLoader from './support/SpinLoader'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import * as IoIcons from 'react-icons/io'

const { SearchBar } = Search;




function priceFormatter(cell, row) {
    if (row.logType) {
      return (
        <span>
          {
            cell === 'error' ? <strong style={ { color: 'red' } }>{ cell }</strong> : 
            cell === 'warn' ? <strong style={ { color: 'violet' } }>{ cell }</strong> : 
            cell === 'info' ? <strong style={ { color: 'blue' } }>{ cell }</strong> :
            cell === 'verbose' ? <strong style={ { color: 'green' } }>{ cell }</strong> :
            <strong style={ { color: 'orange' } }>{ cell }</strong>
          }
          
        </span>
      );
    }
  
    return (
      <span>$ { cell } NTD</span>
    );
  }
  
  
    const selectOptions = {
      0: 101,
      1: 102,
      2: 103
    };
  
    const defaultSorted = [{
      dataField: 'name',
      order: 'desc'
    }];
    
    const columns = [{
      dataField: 'did',
      text: 'Mac address',
      sort:true,
    }, 
    {
        dataField: 'logMsg',
        text: 'Log Message',
        // style: { backgroundColor: 'green' }
      
    },
    {
      dataField: 'logType',
      text: 'Log Type',
    //   filter: textFilter(),
      formatter: priceFormatter,
      sort:true
    },
    {
        dataField: 'logGeneratedDate',
        text: 'Log Generated At',
      //   filter: textFilter(),
        formatter: cell => cell.split("T")[0],
        sort:true
      },
    {
      dataField: 'device_types',
      text: 'Device Type',
      // formatter: cell => selectOptions[cell],
      
    //   filter: textFilter(),
      sort:true
    }];
const NewLogTable = () => {
    const [tabel, setTable] = useState('')
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code')
    const projectName = urlParams.get('name')
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

    const navbardetail = {
        name: projectName,
        dashName:projectName,
        link1:{
            iconName:faHome,
            linkName:'Home'
        },
        link2:{
            iconName:faUserAlt,
            linkName:'Profile'
        }
  
    }

    return (
        <>
            <Navbarr navbardetails = {navbardetail}  />
            {/* <ProjectSideBar /> */}
            {/* <div style={{paddingTop:'1%'}}> */}
            <div style={{margin:'1%', width:'85%', float:'right'}}>
            <IoIcons.IoIosRefreshCircle onClick={refreshButton} className='refreshButton' />
              {
                loading ? <SpinLoader /> :<>
                    {
                        data && data.data && data.data.logs.length ? 
                    //     <BootstrapTable 
                        
                    //     keyField='_id' 
                    //     key = {data.data.logs._id} 
                    //     data={ data.data.logs } 
                    //     columns={ columns } 
                    //     filter={ filterFactory() } 
                    //     noDataIndication="No data found" 
                    //     pagination={ paginationFactory() }
                    //     theadStyle={ { backgroundColor: 'red' } }
            
                    //   /> 
                    
                    <ToolkitProvider
                    keyField="_id"
                    data={ data.data.logs }
                    columns={ columns }
                    // noDataIndication="No data found" 
                    // pagination={ paginationFactory() }
                    search
                    >
                    {
                        props => (
                        <div>
                            <SearchBar { ...props.searchProps } />
                            <BootstrapTable
                            { ...props.baseProps }
                            noDataIndication="No data found" 
                            pagination={ paginationFactory() }
                            />
                        </div>
                        )
                    }
                    </ToolkitProvider>
                      : <h2 style={{color:'#212925', alignItems:'center'}}>No Log Available</h2>
                    }</>
                  }
                  </div>

            {/* </div> */}
        </>
    )
}

export default NewLogTable
