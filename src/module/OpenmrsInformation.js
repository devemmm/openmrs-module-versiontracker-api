const Sequelize = require('sequelize')
const { db } = require('../database/dbConfig')

const Schema = db.define("OpenmrsInformation", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    openmrs_installation_systemdate: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    openmrs_installation_systemtime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    openmrs_installation_openmrs_version:{
        type: Sequelize.STRING,
    },
    hostname: {
        type: Sequelize.STRING
    },
    HealthFacilityFosid: {
        type: Sequelize.STRING 
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    tableName: 'openmrs_information'
})

module.exports = Schema