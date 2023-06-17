const Sequelize = require('sequelize')
const { db } = require('../database/dbConfig')
const Module = require('./Module')
const DataBaseInformation = require('./DataBaseInformation')
const JavaRuntimeEnvironmentInformation = require('./JavaRuntimeEnvironmentInformation')
const MemoryInformation = require('./MemoryInformation')
const OpenmrsInformation = require('./OpenmrsInformation')

const Schema = db.define("HealthFacility", {
    fosid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING,
        defaultValue: "RWANDA"
    },
    province: {
        type: Sequelize.STRING
    },
    district: {
        type: Sequelize.STRING
    },
    sector: {
        type: Sequelize.STRING
    },
    support_phone: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    hie_username: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    hie_password: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    support_phone: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    lastExcutedPeriod: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    tableName: 'health_facility'
})

Schema.hasMany(Module)
Schema.hasOne(DataBaseInformation)
Schema.hasOne(JavaRuntimeEnvironmentInformation)
Schema.hasOne(MemoryInformation)
Schema.hasOne(OpenmrsInformation)
Module.belongsTo(Schema)
DataBaseInformation.belongsTo(Schema)
JavaRuntimeEnvironmentInformation.belongsTo(Schema)
MemoryInformation.belongsTo(Schema)
OpenmrsInformation.belongsTo(Schema)

module.exports = Schema;