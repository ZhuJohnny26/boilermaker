const Sequelize = require('sequelize');
const db = require('./db')

const System = db.define('system', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    logo: {
        type: Sequelize.STRING
    }
})

module.exports = System;
