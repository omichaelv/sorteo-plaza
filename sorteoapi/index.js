require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const formDataRoutes = require('./routes/formDataRoutes');
const authRoutes = require('./routes/authRoutes');
const bcrypt = require('bcrypt'); 
const User = require('./models/User'); 

const app = express();

app.use(bodyParser.json());
app.use(cors());


sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ alter: true });
  })
  .then(async () => {
    console.log('Models synced with the database.');

    const userCount = await User.count();

    if (userCount === 0) {
      const hashedPassword = bcrypt.hashSync('P@ssword1', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('Default admin user created.');
    }
  })
  .catch(err => console.log('Error: ' + err));

app.use('/api',authRoutes);
app.use('/api',formDataRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
