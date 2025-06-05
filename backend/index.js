import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config();

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173', // your frontend port
  credentials: true,
}));
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// POST /signup

app.get("/toprated", async (req, res) => {
  console.log("okkk")
  try {
    const result = await pool.query(`
      SELECT * FROM blogs
    `);
      console.log("okkk")
    res.json({ blogs: result.rows });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Submit a new blog
app.post('/submitBlog', async (req, res) => {
  const { author,title, message } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO blogs (username,title, message,  rating, created_at) VALUES ($1, $2, $3,$4, NOW()) RETURNING *',
      [author,title, message, 4]
    );
    console.log("okkk")
    res.status(201).json({ blog: result.rows[0], status: "success" });
  } catch (error) {
    console.error('Error inserting blog:', error);
    res.status(500).json({ error: 'Error saving blog to database' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
