const express = require("express");
const app = express();

const mongoDb = require('./data/database');

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongoDb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => (console.log(`Running on port ${port}`)));
    }
});