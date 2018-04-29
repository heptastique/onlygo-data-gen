const fs = require("fs")

var output = ""
var localisation = "lat,long\n"

var idAct = 10000
var idReal = 10000
var idPoint = 50000

const up_lat = 45.796251
const up_long = 4.894621

const low_lat = 45.710981
const low_long = 4.809305

var listActRealisee = new Array()

// Generate users
for(var i = 10000; i<10050; i++) {
  id = i-10000
  distance = Math.round((15 * Math.random() + 5))

  var latUser = low_lat + Math.random() * (up_lat-low_lat)
  var longUser = low_long + Math.random() * (up_long-low_long)

  localisation += latUser + "," + longUser + "\n"

  output += "INSERT INTO point (ID, x, y) VALUES (" + idPoint +", " + latUser + ", " + longUser + ");\n"
  output += "INSERT INTO users (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE, OBJECTIFHEBDO, Location_id) VALUES (" + i + ", \"user" + id + "\", \"$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC\", \"user" + id + "\", \"user" + id + "\", \"user" + id + "@user.com\", 1, \"2003/01/22\", "+ distance +", "+ idPoint +");\n"
  output += "INSERT INTO user_authority (USER_ID, AUTHORITY_ID) VALUES ("+ i +", 2);\n"
  output += "INSERT INTO programme(programme_id, date_debut, user_id) VALUES ("+ i +", '2018-04-23', "+ i +");\n"

  idPoint++

  for(var nbAct = 1; nbAct < 5; nbAct ++) {
    // Pour chaque activité prévue
    var jour = 23+nbAct
    var distanceActivite = 7 + Math.random()*5
    var timeframeid = Math.round(Math.random()*56)
    output += "INSERT INTO activity(activity_id, date, distance, estrealisee, programme_id, sport_id, CENTREINTERET_ID, timeframe_id) VALUES ("+ idAct +", '2018-04-"+ jour +"', "+ distanceActivite +", 0, "+ i +", 1, 10000, "+ timeframeid +");\n"
    idAct ++
  }

  for(var nbAct = 1; nbAct < 5; nbAct ++) {
    // Pour chaque activité de la semaine dernière réalisée
    var jour = 16+nbAct
    var distanceActivite = 7 + Math.random()*5
    var timeframeid = Math.round(Math.random()*56)
    output += "INSERT INTO activity(activity_id, date, distance, estrealisee, programme_id, sport_id, CENTREINTERET_ID, timeframe_id) VALUES ("+ idAct +", '2018-04-"+ jour +"', "+ distanceActivite +", 1, "+ i +", 1, 10000, "+ timeframeid +");\n"
    output += "INSERT INTO realisation(realisation_id, date, distance, activity_id, programme_id, CENTREINTERET_ID, timeframe_id) VALUES ("+ idReal +", '2018-04-"+ jour +"', 4, "+ idAct +", " + i + ", 10000, "+ timeframeid +");\n"
    idReal++
    idAct++
  }

  output += "\n"
}

output += "\n\n"

fs.writeFileSync("mock.sql", output)
fs.writeFileSync("users.csv", localisation)