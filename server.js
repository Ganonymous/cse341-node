const express = require('express');
const app = express();

const mongoDb = require('./data/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', require('./routes'));

mongoDb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Running on port ${port}`));
  }
});
