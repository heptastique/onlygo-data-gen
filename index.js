const fs = require('fs')
const polyline = require('@mapbox/polyline')

const data = JSON.parse(fs.readFileSync('data.json'))

var points = new Array()

var output = ""
var csv = "lat,long,libelle\n"

var counterZone = 10000

data.segments.forEach(element => {
  var sommeLat = 0
  var sommeLong = 0
  var counterPoints = 10000
  
  const points = polyline.decode(element.points)

  points.forEach(point => {
    counterPoints++
    sommeLat = sommeLat + point[0]
    sommeLong = sommeLong + point[1]
  })

  var moyLat = sommeLat/counterPoints
  var moyLong = sommeLong/counterPoints

  csv += moyLat + "," + moyLong + ",\"" + element.name + "\"\n"

  output = output + "INSERT INTO point (ID, x, y) VALUES (" + counterZone + ", " + moyLat + ", " + moyLong + ");\n"
  // output = output + "INSERT INTO cercle (ID, rayon, centre) VALUES (" + counterZone + ", 0," + counterZone + ");\n"
  output = output + "INSERT INTO centreinteret (ID, NAME, POINT_ID) VALUES (" + counterZone + ", \"" + element.name + "\", " + counterZone + ");\n"
  
  counterZone++
});

fs.writeFileSync('data.sql', output)
fs.writeFileSync('data.csv', csv)

/*
data.segments.forEach(element => {
  const points = polyline.decode(element.points)
  output = output + "INSERT INTO zone (ID, NAME) VALUES (" + counterZone + ", \"" + element.name + "\");\n"
  points.forEach(point => {
    output = output + "INSERT INTO point (ID, x, y) VALUES (" + counterPoints + ", " + point[0] + ", " + point[1] + ");\n"
    output = output + "INSERT INTO cercle (ID, rayon, centre_id, zone_id) VALUES (" + counterPoints + ", 1, " + counterPoints + " ," + counterZone + ");\n"
    counterPoints++
  })
  counterZone++
});

fs.writeFileSync('data.sql', output)
*/

/*
data.segments.forEach(element => {
  points.push(polyline.decode(element.points))
});

fs.writeFileSync('output.json',JSON.stringify(points))
*/