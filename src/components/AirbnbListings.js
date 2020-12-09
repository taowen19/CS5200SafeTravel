import React, { useEffect, useState } from 'react';
import Listing from './Listing';

let headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Origin','http://localhost:4002');

const filterNeighborhood = (listings, neighborhood) => {
    return listings.filter(listing => listing['Neighborhood'] === neighborhood);
} 

const AirbnbListings = () => {
    const [listing, setListing] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4002/listings',{
            mode: 'cors',
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListing(data);
            })
            .catch(error => {
                console.error('Error fetching listings' + error);
            })
    },[]);

    return (
        <>
            <h4>{
                filterNeighborhood(listing, 'Belltown').map((list, index) => 
                <Listing key={index}
                         info={list} />
            )}
            </h4>
        </>
    )

}

export default AirbnbListings;