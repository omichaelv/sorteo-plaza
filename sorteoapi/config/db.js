const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('plazaSorteo', 'root', 'P@ssword1', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;