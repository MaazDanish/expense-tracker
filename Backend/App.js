const express = require('express');
const cors = require('cors');

const app = express();
const sequelize = require('./Models/expense');
const Router = require('./Routes/routes');

app.use(cors());
app.use(express.json());

app.use('/', Router);

sequelize.sync()
	.then(res => {
		console.log(res);
		app.listen(4000);
	})
	.catch(err => console.log(err));
console.log('WELCOME TO BACKEND WOLRD OF EXPENSE TRACKER IN NODE JS LET\'S CREATE CRUD API');

