CREATE SCHEMA IF NOT EXISTS SafeTravel;
USE SafeTravel;

DROP TABLE IF EXISTS UpdatedListints;
DROP TABLE IF EXISTS WithInDistance;
DROP TABLE IF EXISTS Listing;
DROP TABLE IF EXISTS Host;
DROP TABLE IF EXISTS PropertyType;
DROP TABLE IF EXISTS Offense;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS 100BlockAddress;
DROP TABLE IF EXISTS Neighborhood;
DROP TABLE IF EXISTS PoliceSector;
DROP TABLE IF EXISTS OffenseType;
DROP TABLE IF EXISTS OffenseGroup;

CREATE TABLE OffenseGroup (
    OffenseParentGroup VARCHAR(512),
    CrimeAgainstCategory ENUM('PROPERTY', 'SOCIETY', 'PERSON'),
    CONSTRAINT pk_OffenseGroup_OffenseParentGroup PRIMARY KEY (OffenseParentGroup)
);

CREATE TABLE OffenseType (
    OffenseCode VARCHAR(255),
    Offense VARCHAR(255),
    OffenseParentGroup VARCHAR(512),
    CONSTRAINT pk_OffenseType_OffenseCode PRIMARY KEY (OffenseCode),
    CONSTRAINT fk_OffenseType_OffenseParentGroup
    FOREIGN KEY (OffenseParentGroup)
    REFERENCES OffenseGroup(OffenseParentGroup)
    ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE PoliceSector(
    Beat VARCHAR(255),
    Precinct Enum('N','S', 'W','E', 'SW', 'UNKNOWN'),
    CONSTRAINT pk_PoliceSector_Beat PRIMARY KEY (Beat)
);

CREATE TABLE Neighborhood(
    NeighborhoodId INT AUTO_INCREMENT,
    MCPP VARCHAR(255),
    Beat VARCHAR(255),
    CONSTRAINT pk_Neighborhood_NeighborhoodId PRIMARY KEY (NeighborhoodId),
    CONSTRAINT fk_PoliceSector_Beat
    FOREIGN KEY (Beat)
    REFERENCES PoliceSector(Beat)
    ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE 100BlockAddress(
	100BlockAddress VARCHAR(512),
    CONSTRAINT pk_OneHundredBlockAddress_Address PRIMARY KEY (100BlockAddress)
);
    
CREATE TABLE Location(
    Latitude VARCHAR(255),
    Longitude VARCHAR(255),
	CONSTRAINT pk_Location_Latitude_Longtitude PRIMARY KEY (Latitude, Longitude)
);

CREATE TABLE Offense(
    OffenseId VARCHAR(255),
    ReportDateTime timestamp,
    OffenseCode  VARCHAR(255),
	NeighborhoodId INT,
	100BlockAddress VARCHAR(512),
	Latitude VARCHAR(255),
    Longitude VARCHAR(255),
    CONSTRAINT pk_Offense_OffenseId PRIMARY KEY (OffenseId),
    CONSTRAINT fk_Offense_OffenseCode 
    FOREIGN KEY (OffenseCode) 
    REFERENCES  OffenseType(OffenseCode) 
    ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT fk_Offense_NeighborhoodId 
    FOREIGN KEY (NeighborhoodId ) 
    REFERENCES  Neighborhood(NeighborhoodId ) 
    ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT fk_Offense_Address
    FOREIGN KEY (100BlockAddress)
    REFERENCES  100BlockAddress(100BlockAddress) 
    ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT fk_Offense_Location
    FOREIGN KEY (Latitude, Longitude)
    REFERENCES  Location(Latitude, Longitude) 
    ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE PropertyType(
  PropertyId INT,
  Type VARCHAR(255),
  CONSTRAINT pk_PropertyType_PropertyId PRIMARY KEY (PropertyId)
);

CREATE TABLE Host(
  HostId INT,
  HostName VARCHAR(255),
  HostSince DATE,
  HostResponseRate VARCHAR(255),
  HostIsSuperHost VARCHAR(255),
  HostNeighborhood VARCHAR(255),
  HostListingCount INT,
  CONSTRAINT pk_Host_HostId PRIMARY KEY (HostId)
);

CREATE TABLE Listing(
  ListingId INT,
  Name VARCHAR(255),
  ListingURL VARCHAR(1024),
  PictureURL VARCHAR(1024),
  Neighborhood VARCHAR(255),
  Latitude VARCHAR(255),
  Longitude VARCHAR(255),
  ReviewRating INT DEFAULT 0,
  Price VARCHAR(255),
  Description LONGTEXT,
  PropertyType INT,
  RoomType ENUM ('Entire home/apt', 'Private room', 'Hotel room', 'Shared room'),
  HostId INT,
  CONSTRAINT pk_Listing_ListingId PRIMARY KEY (ListingId),
  CONSTRAINT fk_Listing_HostId
	FOREIGN KEY (HostId)
	REFERENCES Host(HostId)
	ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT fk_Listing_PropertyType
	FOREIGN KEY (PropertyType)
	REFERENCES PropertyType(PropertyId)
	ON UPDATE CASCADE ON DELETE SET NULL,
CONSTRAINT fk_Listing_Location
    FOREIGN KEY (Latitude, Longitude)
    REFERENCES  Location(Latitude, Longitude) 
    ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE WithInDistance(
RecordId INT AUTO_INCREMENT,
ListingId INT,
OffenseId VARCHAR(255),
CONSTRAINT pk_WithInDistance_RecordId PRIMARY KEY (RecordId),
CONSTRAINT fk_WithInDistance_ListingId FOREIGN KEY (ListingId)
REFERENCES Listing(ListingId)
ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT fk_WithInDistance_OffenseId FOREIGN KEY (OffenseId)
REFERENCES Offense(OffenseId)
ON UPDATE CASCADE ON DELETE CASCADE
);

