const sequelize = require('../config/db');
const { Sequelize, DataTypes, Model } = require('sequelize');


class FormData extends Model {}

FormData.init({
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
    valorCompra: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    factura: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'FormData',
});

module.exports = FormData;