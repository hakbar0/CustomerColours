import db from '../firebase/connect';

export const postUser = (DOB, firstname, surname, telephone) => {
  db.ref('/customers').push({
    DOB,
    firstname,
    surname,
    telephone
  });
};
