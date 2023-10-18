require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const formDataRoutes = require('./routes/formDataRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Test Connection and Sync Models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Models synced with the database.');
  })
  .catch(err => console.log('Error: ' + err));

// Use routes
app.use(authRoutes);
app.use(formDataRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});