import React from 'react'
import './ProjectCard.css'
import {Col,Card} from 'react-bootstrap'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon,  } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

const ProjectCard = (props) => {
    return (<>
        

                <Col sm={4} >
                    <Card className="addProjectButton">
                    <Card.Body /* className="addProjectButton" */>
                        
                    <Card.Title style={{textAlign:'left', color:'#212529'}}>{props.data.name}</Card.Title>
                        <Card.Subtitle style={{textAlign:'left'}} className="mb-2 text-muted">{props.data.description && props.data.description} </Card.Subtitle>
                        <Card.Text>
                        {/* Some quick example text to build on the card title and make up the bulk of
                        the card's content. */}
                        </Card.Text>
                        {/* <Card.Link href="#">Card Link</Card.Link> */}
                        {/* <Card.Link className="leftLinkButton" href="#">{props.data.createdAt} </Card.Link> */}
                        <Link to={`/newlogTable?code=${props.data.code}&name=${props.data.name} `} className="rightLinkButton"> <FontAwesomeIcon style={{fontSize:'200%'}}  className='fontAwesomeIconRight' icon={faArrowCircleRight} /> </Link>
                    </Card.Body>
                    </Card>
                </Col>

                </>
    )
}

export default ProjectCard
