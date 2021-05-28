const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

//Like using undefined variables
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

//For deleteing and importing all data
//node dev-data/data/import-dev-data.js --delete
//node dev-data/data/import-dev-data.js --imports

//Postman doc: https://documenter.getpostman.com/view/15807169/TzXumKRZ

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection succesful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('App running on port 3000');
});

//Like db connection failed
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
