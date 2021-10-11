import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io'
import * as FiIcons from 'react-icons/fi'
// import * as LoIcons from 'react-icons/lo'
import { Link } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faWrench, faCopy, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './Navbarr.css';
import { IconContext } from 'react-icons';


const Navbarr = () => {
    const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#1a83ff' }}>
        <div className='navbarr'>
          {/* <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
          <h2 className='titleNavbar' >Navbar Title</h2>
          <h4 className='logoutNavbar' style={{color:'#1a83ff'}}><FontAwesomeIcon icon={faSignOutAlt}  />Logout</h4>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        {/* <nav className='nav-menu active'> */}
          <ul className='nav-menu-items' onClick={showSidebar}>
            {/* <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' style={{float:'left'}}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
            <Link>
            <div className="sidebar_avatar">
                <div className="sidebar_avatar__letters">
                    SP
                </div>
            </div>
            <p className='name-email'>Shaktish Prajapati</p>
            </Link>
            <Link className="nav-text"><AiIcons.AiFillHome style={{marginRight:'8px'}} />Home</Link>
            <Link className="nav-text"><AiIcons.AiFillHome style={{marginRight:'8px'}} />Profile</Link>
            <Link className="nav-text"><AiIcons.AiFillHome style={{marginRight:'8px'}} />Dashboard</Link>
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
