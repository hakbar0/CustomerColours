const db = require("./connect");

function userTest(firstName, surname, telephone, DOB) {
  db.ref("/customers").push({
    firstName,
    surname,
    telephone,
    DOB
  });
};

userTest("haseeb", "akbar", "0161", "20/02/94");

module.exports = { userTest };