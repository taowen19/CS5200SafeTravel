import csv

with open('listings.csv', 'r') as file:
    csvfile = csv.reader(file)
    urls = []

    for lines in csvfile:
        urls.append(lines)

with open('listing_clean.csv', 'r') as file:
    csvfile = csv.reader(file)
    result = []

    for lines in csvfile:
        result.append(lines)

fields = ['ListingId', 'Name', 'ListingURL', 'PictureURL', 'Neighborhood',
          'Latitude', 'Longtitude',
          'ReviewRating', 'Price', 'Description', 'PropertyType', 'RoomType',
          'HostId']

with open('listing_urls.csv', 'w') as file:
    csvwriter = csv.writer(file)
    csvwriter.writerow(fields)

    for i in range(1, len(result)):
        if urls[i][0] == result[i][0]:
            row = []
            row.append(result[i])
            row[0].insert(2, urls[i][1])
            row[0].insert(3, urls[i][4])
            csvwriter.writerow(row[0])
