import React from 'react';
import { Card, CardBody, Row, Col, CardImg, CardTitle,
    CardSubtitle, CardText, Button, Badge } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';


const titleCase = str => {
    str = str.toLowerCase();
    var array = str.split(' ');
    for(var c = 0; c < array.length; c++){
        array[c] = array[c].charAt(0).toUpperCase() + array[c].substring(1);
    }
    return array.join(' ');
}

const safetyIdx = crimeNum => {
    if (crimeNum <= 10) {
        return <Badge color="success" className="safe-bg">Safe <Badge color="secondary">{crimeNum}</Badge></Badge>;
    } else if (crimeNum <= 40) {
        return <Badge color="warning" className="safe-bg">Warning <Badge color="secondary">{crimeNum}</Badge></Badge>;
    } else {
        return <Badge color="danger" className="safe-bg">Danger <Badge color="secondary">{crimeNum}</Badge></Badge>;
    }
}

const Listing = props => {
    const name = titleCase(props.info['Name'].replaceAll('-COMMA-', ','))
    const location = props.info['RoomType'] + ' in ' + props.info['Neighborhood']

    return (
        <>
            <Row>
                <Col md={{size: 10, offset: 1}}>
                    <Card className="bottom-margin">
                        <Row>
                            <Col>
                                <CardImg className="card-img" top src={props.info['PictureURL']} alt="airbnb listing picture" />
                            </Col>
                        </Row>
                        <CardBody>
                            <CardSubtitle tag='h6'>{location}</CardSubtitle>
                            <CardTitle tag='h5'>{name}</CardTitle>
                            <Row>
                                <Col align="left">
                                    <CardText className="card-text">
                                        <FontAwesomeIcon className="fab" icon={faStar} />{' '}
                                        {props.info['ReviewRating']}
                                    </CardText>
                                </Col>
                                <Col align="right">
                                    <CardText className="card-text">{props.info['Price']}</CardText>
                                </Col>
                            </Row>
                            <Row>
                                <Col align="left">
                                    {
                                        safetyIdx(props.info['LastWeekCrimeNum'])
                                    }
                                </Col>
                                <Col align="right" className="top-padding url-btn">
                                    <a href={props.info['ListingURL']} alt="Airbnb Listing URL">
                                        <Button outline color="info" className="utl-btn">Book</Button>
                                    </a>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )

}

export default Listing;