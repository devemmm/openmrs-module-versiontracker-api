const Sequelize = require('sequelize')
const { db } = require('../database/dbConfig')

const Schema = db.define("Module", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    version: {
        type: Sequelize.STRING,
        allowNull: false
    },
    healthFacilityFosid:{
        type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    tableName: 'module'
})

module.exports = Schema