// Agenda Service with Redis
const express = require('express');
const redis = require('redis');
const app = express();
const port = 3001;

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379' // From ConfigMap/Secret in K8s
});
client.connect();

app.get('/agenda', async (req, res) => {
  try {
    await client.set('agenda', JSON.stringify([{id: 1, talk: 'Kubernetes Basics'}]));
    const agenda = await client.get('agenda');
    res.json(JSON.parse(agenda));
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Agenda service on port ${port}`);
});

