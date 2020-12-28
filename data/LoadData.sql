USE SafeTravel;

LOAD DATA LOCAL INFILE '/var/tmp/data/offensecategory_clean.csv' INTO TABLE OffenseGroup
  FIELDS TERMINATED BY ',' 
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/offensetype_clean.csv' INTO TABLE OffenseType
  FIELDS TERMINATED BY ',' 
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;

LOAD DATA LOCAL INFILE '/var/tmp/data/policesector_clean.csv' INTO TABLE PoliceSector
  FIELDS TERMINATED BY ',' 
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/neighborhood_clean.csv' INTO TABLE Neighborhood
  FIELDS TERMINATED BY ',' 
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/100BlockAddress_clean.csv' INTO TABLE 100BlockAddress
  FIELDS TERMINATED BY ',' 
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/location_whole.csv' INTO TABLE Location
  FIELDS TERMINATED BY ',' 
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/offense_clean.csv' INTO TABLE Offense
  FIELDS TERMINATED BY ',' 
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/property_type.csv' INTO TABLE PropertyType
  FIELDS TERMINATED BY ','  
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/host_clean.csv' INTO TABLE Host
  FIELDS TERMINATED BY ','  
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/listing_urls.csv' INTO TABLE Listing
  FIELDS TERMINATED BY ','  
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;
  
LOAD DATA LOCAL INFILE '/var/tmp/data/withindistance.csv  ' INTO TABLE WithInDistance
  FIELDS TERMINATED BY ','  
  LINES TERMINATED BY '\r\n'
  IGNORE 1 LINES;


-- Create table UpdatedListings containing total crimes last week and night crimes for each listing 
CREATE TABLE UpdatedListings
SELECT A.ListingId AS ListingId, Name, ListingURL, PictureURL, Neighborhood, Latitude, Longitude, ReviewRating, Price, RoomType,
LastWeekCrimeNum, IF(B.ListingId IS NULL, 0, CrimeNumAtNight) AS CrimeNumNight
FROM 
  (SELECT Listing.ListingId AS ListingId, Name, ListingURL, PictureURL, Neighborhood, Latitude, Longitude, ReviewRating, Price, RoomType, 
  COUNT(*) AS LastWeekCrimeNum
  FROM Listing LEFT OUTER JOIN WithInDistance
  ON Listing.ListingId = WithInDistance.ListingId
  GROUP BY Listing.ListingId) as A
LEFT OUTER JOIN 
  (SELECT ListingId, COUNT(*) AS CrimeNumAtNight
  FROM (
    (SELECT *
    FROM Listing LEFT OUTER JOIN WithInDistance USING (ListingId)) AS T1
    LEFT OUTER JOIN Offense ON T1.OffenseId = Offense.OffenseId
     )
  WHERE TIME(Offense.ReportDateTime) > "22:00:00" AND TIME(Offense.ReportDateTime) < "6:00:00"
  GROUP BY ListingId) AS B
ON A.ListingId = B.ListingId;
  
  
  

  
  