const pg = require("pg");
const settings = require("./settings");
const moment = require("moment");

let input = process.argv[2];
//console.log(input);

const client = new pg.Client ({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var displayResults = function(array){
  console.log(`Found ${array.length} person(s) by the name of \'${input}\':`)
  array.forEach(function(elm){
    birthday = moment(elm.birthdate).format('YYYY-MM-DD');
    console.log(`-${elm.id}: ${elm.first_name} ${elm.last_name}, born \'${birthday}\'`);
  });
}

client.connect((err) =>{
  if(err){
    return console.log("We dun goofed.", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [input], (err,result) => {
    if (err) {
      return console.error("error running query", err);
    }
    displayResults(result.rows);
    client.end();
  })
  //WHY DOES IT NOT WORK IF I CLOSE THE DB HERE
});