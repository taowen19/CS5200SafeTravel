import React from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons"; 

const Header = () => 
    <Row className="homepage-header text-center">
        <Col md={{size: 10, offset: 1}}>
            <h1><FontAwesomeIcon className="fa-airbnb" icon={faAirbnb} />
                <span className="left-padding">Safe</span>Travel</h1>
            <hr />
        </Col>
    </Row>

export default Header;