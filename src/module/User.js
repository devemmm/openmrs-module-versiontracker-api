const Sequelize = require('sequelize')
const { db } = require('../database/dbConfig')
const Token = require('./Token')

const Schema = db.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    names: {
        type: Sequelize.STRING,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        required: true
    },
    phone: {
        type: Sequelize.STRING,
        required: true
    },
    type: {
        type: Sequelize.ENUM(['USER', 'ADMIN']),
        defaultValue: 'ADMIN'
    },
    avatar: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    tableName: 'module_truck_user'
})

Schema.hasMany(Token)
Token.belongsTo(Schema)

module.exports = Schema;