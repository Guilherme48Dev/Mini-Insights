const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const insightRoutes = require('./routes/insightRoutes');

app.use('/auth', authRoutes); 
app.use('/insights', insightRoutes);

module.exports = app;
