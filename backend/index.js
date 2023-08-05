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
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend domain
    credentials: true, // Allow cookies to be sent with the request
}));
app.options('*',cors());
app.use(express.json());

//import routes
//USER
const authRoute = require('./routes/users/auth');
const companyRoute = require('./routes/users/company');
const jobseekerRoute = require('./routes/users/jobseeker');
const projectRoute = require('./routes/users/project');
const educationRoute = require('./routes/users/education');
const achievementRoute = require('./routes/users/achievement');
const workexperienceRoute = require('./routes/users/workexperience');
const publicationRoute = require('./routes/users/publication');
const skillRoute = require('./routes/users/skill');

//route middleware
//USER
app.use('/api/auth', authRoute);    // everything in authroute will have this prefix
app.use('/api/company', companyRoute);
app.use('/api/jobseeker', jobseekerRoute);
app.use('/api/project', projectRoute);
app.use('/api/education', educationRoute);
app.use('/api/achievement', achievementRoute);
app.use('/api/workexperience', workexperienceRoute);
app.use('/api/publication', publicationRoute);
app.use('/api/skill', skillRoute);
 

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