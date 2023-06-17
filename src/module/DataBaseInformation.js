const Sequelize = require('sequelize')
const { db } = require('../database/dbConfig')

const Schema = db.define("DataBaseInformation", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    connection_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username:{
        type: Sequelize.STRING,
    },
    driver: {
        type: Sequelize.STRING
    },
    dialect: {
        type: Sequelize.STRING
    },
    HealthFacilityFosid: {
        type: Sequelize.STRING 
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    tableName: 'database_information'
})

module.exports = Schema