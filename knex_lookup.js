const pg = require("pg");
const settings = require ("./settings");
const moment = require ("moment");

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
    }
});

let input = process.argv[2];

var displayResults = function(array){
  console.log(`Found ${array.length} person(s) by the name of \'${input}\':`)
  array.forEach(function(elm){
    birthday = moment(elm.birthdate).format('YYYY-MM-DD');
    console.log(`-${elm.id}: ${elm.first_name} ${elm.last_name}, born \'${birthday}\'`);
  });
}

knex
  .select()
  .from('famous_people')
  .where('first_name', input)
  .orWhere('last_name', input)
  .then(function(result){
    displayResults(result);
  })
  .catch(function(err){
    console.log(err);
  });

  knex.destroy();

