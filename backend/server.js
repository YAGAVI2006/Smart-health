const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// connect db
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/report'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));