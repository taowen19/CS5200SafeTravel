/** SERVER CONFIGURATION */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'SafeTravel'
});

/** START THE APP */
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/listings', function(req, res) {

    connection.query('SELECT * FROM UpdatedListings', function(error, results) {
        if (error) {
            console.log('error query: ' + error)
        }
    
        res.send(results);
    })
});

app.listen(4002, () => {
    console.log('Listening on port 4002');
});