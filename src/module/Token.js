const Sequelize = require('sequelize')
const { db } = require('../database/dbConfig')


const Token = db.define("Token", {
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    tableName: 'token'
})

module.exports = Token