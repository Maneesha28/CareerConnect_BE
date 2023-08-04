require('dotenv').config();
const express = require('express');
const req = require('express/lib/request');

const app = express();
app.use(express.json());
//added for ejs
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const cors = require("cors");
app.use(cors());
app.options('*',cors());
app.use(express.json());

//import routes
//USER
const authRoute = require('./routes/users/auth');
const companyRoute = require('./routes/users/company');


//route middleware
//USER
app.use('/api/auth', authRoute);    // everything in authroute will have this prefix
app.use('/api/company', companyRoute)
 

//PORT
const port = process.env.PORT;
app.listen(port, async () => {
    try{
        console.log(`listening on http://localhost:${port}`);
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
});