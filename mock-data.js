const fs = require("fs")

var output = fs.readFileSync("base.sql")
output += "\n\n\n"

var localisation = "lat,long\n"

var idAct = 10000
var idReal = 10000
var idPoint = 50000
var idProgramme = 10000
var idUser = 10000
var idObjectif = 100

const up_lat = 45.796251
const up_long = 4.894621

const low_lat = 45.710981
const low_long = 4.809305

var listActRealisee = new Array()

// Generate users
for(var i = 0; i<50; i++) {
  distance = Math.round((15 * Math.random() + 5))

  var latUser = low_lat + Math.random() * (up_lat-low_lat)
  var longUser = low_long + Math.random() * (up_long-low_long)

  localisation += latUser + "," + longUser + "\n"

  var username = idUser - 10000

  var difficulty = Math.round(Math.random()*3)

  output += "INSERT INTO point (ID, x, y) VALUES (" + idPoint +", " + latUser + ", " + longUser + ");\n"
  output += "INSERT INTO users (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE, Location_id, difficulty) VALUES (" + idUser + ", \"user" + username + "\", \"$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC\", \"user" + username + "\", \"user" + username + "\", \"user" + username + "@user.com\", 1, \"2003/01/22\", "+ idPoint +", "+ difficulty +");\n"
  output += "INSERT INTO user_authority (USER_ID, AUTHORITY_ID) VALUES ("+ idUser +", 2);\n"
  //output += "INSERT INTO objectif (id, objectif, sport_id) VALUES (" + idObjectif + ", 10, 1);\n"
  //output += "INSERT INTO users_objectifs (user_id, objectifs_id) VALUES ("+ idUser +", "+ idUser +");\n"
  
  idObjectif++
  idPoint++

  // Generate future program
  const jours = ["2018-04-30", "2018-05-01", "2018-05-02", "2018-05-03", "2018-05-04"]
  const idPlageHoraire = [6, 14, 20, 31, 39]

  var objectif = Math.round(5 + Math.random()*10)
  output += "INSERT INTO programme(programme_id, date_debut, user_id) VALUES ("+ idProgramme +", '2018-04-30', "+ idUser +");\n"
  //output += "INSERT INTO objectif(id, objectif, sport_id) VALUES ("+ idObjectif +", 10, 1);\n"
  //output += "INSERT INTO programme_objectifs(programme_programme_id, objectifs_id) VALUES ("+ idProgramme +", 1);\n"

  idObjectif++

  for(var nbAct = 1; nbAct < 5; nbAct ++) {
    var distanceActivite = 7 + Math.random()*5
    var timeframeid = Math.round(Math.random()*56)

    output += "INSERT INTO activity(activity_id, date_prevue, distance_prevue, distance_realisee, estrealisee, programme_id, sport_id, CENTREINTERET_ID, timeframe_id) VALUES ("+ idAct +", '" + jours[nbAct] +"', "+ distanceActivite +", 0, 0, "+ idProgramme +", 1, 10000, "+ idPlageHoraire[nbAct] +");\n"
    
    idAct ++
  }

  // Generating past program
  idProgramme ++
  var objectif = Math.round(5 + Math.random()*10)
  output += "INSERT INTO programme(programme_id, date_debut, user_id) VALUES ("+ idProgramme +", '2018-04-23', "+ idUser +");\n"
  //output += "INSERT INTO objectif(id, objectif, sport_id) VALUES ("+ idObjectif +", 10, 1);\n"
  //output += "INSERT INTO programme_objectifs(programme_programme_id, objectifs_id) VALUES ("+ idProgramme +", 1);\n"

  idObjectif++

  for(var nbAct = 1; nbAct < 5; nbAct ++) {
    // Pour chaque activité de la semaine dernière réalisée
    var jour = 16+nbAct
    var distanceActivite = 7 + Math.random()*5
    var timeframeid = Math.round(Math.random()*56)
    
    output += "INSERT INTO activity(activity_id, date_prevue, date_realisee, distance_prevue, distance_realisee, estrealisee, programme_id, sport_id, CENTREINTERET_ID, timeframe_id) VALUES ("+ idAct +", '2018-04-"+ jour +"', '2018-04-"+ jour + "\', " + distanceActivite +", "+ distanceActivite +", 1, "+ idProgramme +", 1, 10000, "+ timeframeid +");\n"
    // output += "INSERT INTO realisation(realisation_id, date, distance, activity_id, programme_id, CENTREINTERET_ID, timeframe_id) VALUES ("+ idReal +", '2018-04-"+ jour +"', 4, "+ idAct +", " + idProgramme + ", 10000, "+ timeframeid +");\n"
    
    idReal++
    idAct++
  }

  idUser++
  idProgramme++

  output += "\n"
}

output += "\n\n"

fs.writeFileSync("C:\\Users\\victo\\IdeaProjects\\onlygo\\src\\main\\resources\\import.sql", output)
fs.writeFileSync("users.csv", localisation)