import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io'
import * as FiIcons from 'react-icons/fi'
// import * as LoIcons from 'react-icons/lo'
import { Link } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faWrench, faCopy, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import './Navbarr.css';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../action/AdminAction';
import { useHistory } from 'react-router';


const Navbarr = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const adminLoginReducer = useSelector(state => state.adminLoginReducer)
    const {loading,adminInfo} = adminLoginReducer
    // const firstLetter = props.navbardetails.name.split(" ")[0].charAt(0).toUpperCase()
    // const secondLetter = props.navbardetails.name.split(" ")[1].charAt(0).toUpperCase()

  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch()
  let history = useHistory()
  const handlelogout = (e)=>{
      e.preventDefault()
        dispatch(adminLogout(history))
  }

  const currentRoute = useHistory().location.pathname.toLowerCase();
  console.log(currentRoute)
  return (
    <>
      <IconContext.Provider value={{ color: '#1a83ff' }}>
        <div className='navbarr'>
          {/* <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
          <h2 className='titleNavbar' style={{color:'#1a83ff'}} >{props.navbardetails.dashName}</h2>
          <div onClick={e=>{handlelogout(e)}} className='logoutNavbar' style={{color:'#1a83ff'}}> <FontAwesomeIcon icon={faSignOutAlt} />Logout</div>
        </div>
        {/* <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}> */}
        <nav className='nav-menu'>
        {/* <nav className='nav-menu active'> */}
          <ul style={{padding:'0%'}} /* className='nav-menu-items' */ onClick={showSidebar}>
            {/* <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' style={{float:'left'}}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
            <Link to='/' style={{cursor:'hide'}}>
            <div className="sidebar_avatar">
                <div className="sidebar_avatar__letters">
                   {/* { `${firstLetter}${secondLetter}`} */}
                   {
                  props.navbardetails.name.split(" ").map((name)=> name[0][0].toUpperCase())
            }
                </div>
            </div>
            
            <p className='name-email' 
            > {props.navbardetails.name} </p>
            <p className='name-email'>saman@gmail.com</p>
            </Link>
            {/* <Link className="nav-text"><AiIcons.AiFillHome style={{marginRight:'8px'}} />Home</Link> */}
            {
              console.log(props.navbardetails.link1.iconName)
            }
            <Link to={props.navbardetails.link1 && props.navbardetails.link1.link && props.navbardetails.link1.link.length ==0 ? '' :props.navbardetails.link1.link}  className={currentRoute.includes("home") || currentRoute.includes("newlogtable") ? "nav-text active" : "nav-text"}
            ><FontAwesomeIcon style={{marginRight:'8px'}} icon={props.navbardetails.link1.iconName}/>{/* <AiIcons.AiFillHome style={{marginRight:'8px'}} /> */}{props.navbardetails.link1.linkName}</Link>
            <Link to={props.navbardetails.link2 && props.navbardetails.link2.link && props.navbardetails.link2.link.length ==0 ? '' :props.navbardetails.link2.link} className="nav-text"><FontAwesomeIcon style={{marginRight:'8px'}} icon={props.navbardetails.link2.iconName}/> {props.navbardetails.link2.linkName} </Link>
            {/* {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbarr
