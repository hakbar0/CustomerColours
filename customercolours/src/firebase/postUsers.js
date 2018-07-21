import faker from 'faker';
import { postUser } from './postToDb';

export const postRandomUsers = () => {
  for (let i = 0; i < 500; i++) {
    postUser(
      `${faker.random.number({ min: 1, max: 28 })}/${faker.random.number({ min: 1, max: 12 })}/${faker.random.number({ min: 1920, max: 2000 })}`,
      faker.fake("{{name.firstName}}"),
      faker.fake("{{name.lastName}}"),
      faker.fake("{{phone.phoneNumberFormat}}"),
    );
  };
};
