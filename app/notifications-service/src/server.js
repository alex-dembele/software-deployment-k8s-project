// Notifications Service
const express = require('express');
const app = express();
const port = 3003;

app.post('/notify', (req, res) => {
  console.log('Sending notification...'); // Simulate
  res.send('Notification sent');
});

app.listen(port, () => {
  console.log(`Notifications service on port ${port}`);
});

