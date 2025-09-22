// Simple Express server for frontend
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});

// Explication: Ce server sert un HTML simple. Dans une app réelle, utilisez React. Ici, pour apprentissage, on appelle les backends via JS dans HTML.