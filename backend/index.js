const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors()); // Critical for React to talk to Node
app.use(express.json());

// --- ADDED: Hello World / Health Check Path ---
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: "Hello World! The backend is officially running.",
    status: "OK" 
  });
});

// --- ADDED: Secondary Test Path ---
app.get('/test', (req, res) => {
  res.send("Backend test successful!");
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'API is running',
    status: 'OK'
  });
});

// Mirror test endpoint under /api so frontend baseURL checks work.
app.get('/api/test', (req, res) => {
  res.send("Backend test successful!");
});

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});