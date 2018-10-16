const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  	ssl: true,
  }
}); // Just initializaing knex

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {res.send('it is working')})
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)});
app.post('/register',(req,res) => {register.handleRegister(req, res, db, bcrypt)});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.put('/image',(req,res) => {image.handleImage(req,res,db)});
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)});


app.listen(process.env.PORT || 3000 , () => {
	console.log(`app running on port ${process.env.PORT}`);
})