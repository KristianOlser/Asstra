// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Transaction, Asset, User, Portfolio } = initSchema(schema);

export {
  Transaction,
  Asset,
  User,
  Portfolio
};