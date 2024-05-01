const express = require('express');
const bodyParser = require('body-parser'); // replace with middleware 
const mysql = require('mysql2');
const knex = require('knex');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//CHECK CRUD CODEALONG
const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'mypcospal_db'
  }
});


app.post('/api/date', (req, res) => {
  const { date, mood, symptoms, activities, comment } = req.body;

  
  db('entries')
    .insert({
      date,
      mood,
      symptoms: JSON.stringify(symptoms),
      activities: JSON.stringify(activities),
      comment
    })
    .then(() => {
      res.json({ message: 'Form submitted successfully' });
    })
    .catch((err) => {
      console.error('Error submitting form data:', err);
      res.status(500).json({ error: 'An error occurred while submitting form data' });
    });
});

app.get('/api/date', (req, res) => {
  
  db.select('*').from('entries')
    .then((entries) => {
      res.json(entries);
    })
    .catch((err) => {
      console.error('Error retrieving form data:', err);
      res.status(500).json({ error: 'An error occurred while retrieving form data' });
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
