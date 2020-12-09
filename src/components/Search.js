import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faHome, faSearch, faSortNumericDown } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Button, Alert } from "reactstrap";
import Listings from "./Listings";

let searchingBegun = false;

const sortOnPrice = listings => {
    let sorted = [...listings]
    sorted.sort((a,b) => {
      let first = a['Price'].substring(1)
      let second = b['Price'].substring(1)
      return parseFloat(first) - parseFloat(second)
    })
    return sorted;
  }

const roomTypeOptions = [
    { value: 'Any', label: 'Any type'},
    { value: 'Entire home/apt', label: 'Entire home/apt' },
    { value: 'Private room', label: 'Private room' },
    { value: 'Shared room', label: 'Shared room'},
    { value: 'Hotel room', label: 'Hotel room'}
]

const neighborhoodOptions = [
    { value: 'Broadway', label: 'Broadway' },
    { value: 'Belltown', label: 'Belltown' },
    { value: 'Wallingford', label: 'Wallingford'},
    { value: 'Central Business District', label: 'Central Business District' },
    { value: 'University District', label: 'University District'},
    { value: 'Minor', label: 'Minor'},
    { value: 'Fremont', label: 'Fremont'},
    { value: 'Pike-Market', label: 'Pike-Market'}
]

const showListing = (neighborhood, listing) => {
    for (let i = 0; i < neighborhood.selectedOptions.length; i++) {
        if (listing['Neighborhood'] === neighborhood.selectedOptions[i].value) {
            return true;
        }
    }
    return false;
}

const getSearchedListings = (listings, type, neighborhood) => {
    let searchedResults = [...listings];
    console.log("get search", neighborhood);
    if (Object.keys(type).length > 0 && type.selectedOptions.value !== 'Any') {
        searchedResults = searchedResults.filter(listing => listing['RoomType'] === type.selectedOptions.value)
    };
    if (Object.keys(neighborhood).length > 0 && neighborhood.selectedOptions !== null) {
        let result = [];
        for (let i = 0; i < searchedResults.length; i++) {
            if (showListing(neighborhood, searchedResults[i])) {
                result.push(searchedResults[i]);
            }
        }
        searchedResults = result;
    };
    return searchedResults;
}

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Origin','http://localhost:4002');

const Search = () => {
    const [roomType, setRoomType] = useState([]);
    const [neighborhood, setNeighborhood] = useState([]);
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4002/listings',{
            mode: 'cors',
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching listings' + error);
            })
    },[]);

    const onSearchClick = () => {
        searchingBegun = false;
        console.log(roomType);
        console.log(neighborhood);
        setResult(getSearchedListings(data, roomType, neighborhood));
    }

    const onTypeOptionChange = selectedOptions => {
        console.log(selectedOptions);
        searchingBegun = true;
        setResult([]);
        setRoomType({ selectedOptions });
    }

    const onNeighborhoodOptionChange = selectedOptions => {
        searchingBegun = true;
        setResult([]);
        setNeighborhood({ selectedOptions });
    }

    const onSortPriceClick = () => {
        setResult(sortOnPrice(result))
    }
    return (
        <>
            <Row>
                <Col xs={{size: 10, offset: 1}}>
                    <p><FontAwesomeIcon icon={faHome} />
                    <span className="left-padding">Places to stay in Seattle. </span></p>
                </Col>
            </Row>
            <Row>
                <Col xs={{size: 10, offset: 1}}>
                    <p><FontAwesomeIcon icon={faFilter} />
                    <span className="left-padding">Select at least one option to begin:  </span></p>
                </Col>
            </Row>
            <Row className="bottom-margin">
                <Col md={{size:4, offset: 1}}>
                    <Select options={roomTypeOptions}
                            placeholder="Room Type..."
                            onChange={onTypeOptionChange}
                            />
                </Col>
                <Col md={{size:4}} align="center">
                    <Select options={neighborhoodOptions}
                            placeholder="Neighborhood..."
                            isMulti
                            onChange={onNeighborhoodOptionChange}
                            />
                </Col>
                <Col md="2" align="left">
                    <Button color="secondary"
                            active={roomType.length > 0 || neighborhood.length > 0}
                            disabled={roomType.length === 0 && neighborhood.length === 0}
                            onClick={() => {
                                onSearchClick();
                                }}><FontAwesomeIcon icon={faSearch} />{' '}
                        Search
                    </Button>{"  "}
                    <Button color="info" onClick={() => onSortPriceClick()}>
                        ${" "}<FontAwesomeIcon icon={faSortNumericDown} /></Button>
                </Col>
            </Row>
            <Row>
                <Col md={{size: 10, offset: 1}}>
                {
                    !searchingBegun && (roomType.length > 0 || neighborhood.length > 0) && result.length === 0 &&
                        <Alert color="danger">The listings doesn't have satisfied result for your query.
                        Modify your configuration and try again!</Alert>
                }
                </Col>
            </Row>
            {
                result.length > 0 
                && 
                <>
                    <Row>
                        <Col md={{size: 10, offset: 1}}>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{size:3, offset:1}} className="bottom-margin">
                            <h6>{result.length} stays in Seattle</h6>
                        </Col>
                    </Row>
                    <Listings listings={result} />
                </>
            }
        </>
    )



}

export default Search;