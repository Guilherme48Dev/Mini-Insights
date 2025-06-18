const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const insightRoutes = require('./routes/insightRoutes');

app.use(express.json());
app.use('/auth', authRoutes); 
app.use('/insights', insightRoutes);

module.exports = app;
