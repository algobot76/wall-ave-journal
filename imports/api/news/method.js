import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


import News from './news/news';


export const newsGetAll = new ValidatedMethod ({
  name: 'stocks.getAll',
  validate: new SimpleSchema({}).validator(),
  run() {
    return Stocks.find({}).fetch();
  }
});
