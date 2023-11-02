const Sequelize = require('sequelize');
const configDB = require('../config/database');

const Usuario = require('../models/Usuario');

const connection = new Sequelize(configDB)

Usuario.init(connection)

module.exports = connection