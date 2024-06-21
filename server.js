const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.get('/ordenes', (req, res) => {
  const sqlQuery = 'SELECT * FROM orden';
  
  db.query(sqlQuery, (error, result) => {
    if (error) throw error;
    
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});