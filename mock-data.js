const fs = require("fs")

var output = fs.readFileSync("base.sql")
output += "\n\n\n"

var localisation = "lat,long\n"

var idAct = 10000
var idReal = 10000
var idPoint = 50000
var idProgramme = 10000

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
  output += "INSERT INTO programme(programme_id, date_debut, user_id) VALUES ("+ idProgramme +", '2018-04-23', "+ i +");\n"

  idProgramme++
  idPoint++

  const jours = ["2018-04-30", "2018-05-01", "2018-05-02", "2018-05-03", "2018-05-04"]
  const idPlageHoraire = [6, 14, 20, 31, 39]

  for(var nbAct = 1; nbAct < 5; nbAct ++) {
    // Pour chaque activité prévue
    var jour = 23+nbAct
    var distanceActivite = 7 + Math.random()*5
    var timeframeid = Math.round(Math.random()*56)

    output += "INSERT INTO programme(programme_id, date_debut, user_id) VALUES ("+ idProgramme +", '2018-04-30', "+ i +");\n"
    output += "INSERT INTO activity(activity_id, date, distance, estrealisee, programme_id, sport_id, CENTREINTERET_ID, timeframe_id) VALUES ("+ idAct +", '" + jours[nbAct] +"', "+ distanceActivite +", 0, "+ idProgramme +", 1, 10000, "+ idPlageHoraire[nbAct] +");\n"
    
    idProgramme ++
    idAct ++
  }

  idProgramme ++

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