import React from "react";
import { CardColumns, Row, Col } from "reactstrap";
import Listing from "./Listing";

const Listings = props => {

    return (
        <>
          <Row>
            <Col md={{size: 10, offset: 1}}>
              <CardColumns>
              {
                props.listings.map((listing, index) => 
                <Listing key={index}
                        info={listing} />)
              }
              </CardColumns>
            </Col>
          </Row>
        </>
    )
}

export default Listings;