import React,{useState,useEffect} from 'react'
import Navbarr from './Navbarr'
import './Home.css'
import { faHome, faWrench, faCopy, faPlus, faArrowCircleRight, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import {getAllProject} from '../action/ProjectAction'
import AddProjectModal from './AddProjectModal'
import SpinLoader from './support/SpinLoader'
import ProjectCard from './ProjectCard'

const Home = () => {
    const [modal, setModal] = useState(false)
    const Dispatch = useDispatch();
    const getAllProjectReducer = useSelector(state => state.getAllProjectReducer)
    const {loading, allProjectData} = getAllProjectReducer

    const adminLoginReducer = useSelector(state => state.adminLoginReducer)
    const { adminInfo} = adminLoginReducer

    const navbardetail = {
        name: adminInfo.data.name,
        dashName:'Welcome',
        link1:{
            iconName:faHome,
            linkName:'Home'
        },
        link2:{
            iconName:faUserAlt,
            linkName:'Profile'
        }

    }
    
    useEffect(() => {
        console.log('home page useeffect')
        Dispatch(getAllProject())
    },[])

    const closeModal = ()=>{
        setModal(false)
    }

    return (
        <>
        <Navbarr navbardetails = {navbardetail}  />
        <div className='homeCards' >
                {loading ?  <SpinLoader /> :
            
                
            <Row /* xs={2} md={4} lg={6} */ >
                
                {
                    adminInfo.data && adminInfo.data.isSuperAdmin ? 
                
                <Col sm={4} >
                    <Card className="addProjectButton">
                    <Card.Body /* className="addProjectButton" */>
                        
                        <Card.Text>
                        {/* <div class="dot">+</div> */}
                        {/* <div class="card">  */}
                            <Button style={{borderRadius:'100%', backgroundColor:'#1a83ff'}} className="homedot btn btn-secondary " onClick={(e)=>{setModal(true)}} > 
                                {/* <img src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg" alt="user-image"/> */}
                                {/* <div className="plusSign"  >+</div> */}
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                            <p style={{fontWeight:'bold', color:'#1a83ff'}}>Add Project</p>
                            <AddProjectModal
                            show = {modal}
                            onHide = {() => setModal(false)}
                            closemodal = {closeModal}
                            />

                            {/* <div class="card_info"> 
                                <h2>USER NAME</h2>
                                <a href="#!">loremIpsum.com</a>
                            </div> */}
                        {/* </div> */}
                       
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col> :''

                }

                {/* <Col sm={4} > */}
                    {/* <Card className="addProjectButton"> */}
                    {/* <Card.Body className="addProjectButton"> */}
                        
                    {/* <Card.Title style={{textAlign:'left', color:'#212529'}}>Ventilator</Card.Title>
                        <Card.Subtitle style={{textAlign:'left'}} className="mb-2 text-muted">loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum </Card.Subtitle>
                        <Card.Text> */}
                        {/* Some quick example text to build on the card title and make up the bulk of
                        the card's content. */}
                        {/* </Card.Text> */}
                        {/* <Card.Link href="#">Card Link</Card.Link> */}
                        {/* <Card.Link className="leftLinkButton" href="#">{props.data.createdAt} </Card.Link> */}
                        {/* <Link to={`#`}className="rightLinkButton"> <FontAwesomeIcon style={{fontSize:'200%'}}  className='fontAwesomeIconRight' icon={faArrowCircleRight} /> </Link> */}
                    {/* </Card.Body> */}
                    {/* </Card> */}
                {/* </Col> */}

                

                
               
            {
                allProjectData && allProjectData.data.data.length && allProjectData.data.data.map(datas =>  <ProjectCard data={datas} />) 
            }
               
            </Row>
            }
            </div>
        </>
    )
}

export default Home
