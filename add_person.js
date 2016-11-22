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

let input = process.argv.slice(2);

knex("famous_people")
  .insert({
    "first_name": input[0],
    "last_name": input[1],
    "birthdate": input[2]
  })
  .then(function(result){
    console.log(result);
  })
  .catch(function(err){
    console.log(err);
  });

knex.destroy();