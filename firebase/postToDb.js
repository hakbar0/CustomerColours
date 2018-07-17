const db = require("./connect");

function postToDb(firstName, surname, telephone, DOB) {
  db.ref("/customers").push({
    firstName,
    surname,
    telephone,
    DOB
  });
};

module.exports = { postToDb };