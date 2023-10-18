const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

class FormData extends Model {}

FormData.init({
    // Define attributes here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tienda: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valorCompra: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    facturaImage: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'FormData'
});

module.exports = FormData;