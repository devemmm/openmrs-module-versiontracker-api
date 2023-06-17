const Sequelize = require('sequelize')
const { db } = require('../database/dbConfig')

const Schema = db.define("JavaRuntimeEnvironmentInformation", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    operating_system: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    operating_system_arch: {
        type: Sequelize.STRING,
        allowNull: false
    },
    operating_system_version:{
        type: Sequelize.STRING,
    },
    javaVersion: {
        type: Sequelize.STRING
    },
    java_vendor: {
        type: Sequelize.STRING
    },
    jvm_version: {
        type: Sequelize.STRING
    },
    jvm_vendor: {
        type: Sequelize.STRING
    },
    java_runtime_name: {
        type: Sequelize.STRING
    },
    java_runtime_version: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    system_language: {
        type: Sequelize.STRING
    },
    system_timezone: {
        type: Sequelize.STRING
    },
    file_system_encoding: {
        type: Sequelize.STRING
    },
    user_directory: {
        type: Sequelize.STRING
    },
    temp_directory:{
        type: Sequelize.STRING
    },
    HealthFacilityFosid: {
        type: Sequelize.STRING 
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    tableName: 'java_runtime_environment_information'
})

module.exports = Schema