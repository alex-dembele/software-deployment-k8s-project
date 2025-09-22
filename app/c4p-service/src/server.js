// C4P Service with PostgreSQL
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3002;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || 'postgres://user:pass@postgres:5432/db' // From Secret
});

app.get('/proposals', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM proposals'); // Assume table created
    res.json(rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`C4P service on port ${port}`);
});

