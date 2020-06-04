const Sequelize = require('sequelize');
const db = require('./db')

const Game = db.define('game', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    imageUrl: {
        type: Sequelize.STRING
    }

})

module.exports = Game
