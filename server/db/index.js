const db = require('./db');
const Game = require('./game');
const System = require('./system');
const User = require('./user')

System.belongsToMany(Game, {through: 'platform'})
Game.belongsToMany(System, {through: 'platform'})

module.exports = {
    db,
    Game,
    System,
    User
}