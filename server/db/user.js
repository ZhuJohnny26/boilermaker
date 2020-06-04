const Sequelize = require('sequelize');
const db = require('./db')
const crypto = require('crypto')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        Unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }

    },
    password: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    googleId: Sequelize.STRING,
    salt: Sequelize.STRING
}, { 
    hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }})

// instance methods
User.prototype.correctPassword = function (candidatePassword) {
    // should return true or false for if the entered password matches
    return User.encryptPassword(candidatePassword, this.salt) === this.password;
};

// class methods
    User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
    // accepts a plain text password and a salt, and returns its hash
    const hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

function setSaltAndPassword (user) {
    // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

module.exports = User
