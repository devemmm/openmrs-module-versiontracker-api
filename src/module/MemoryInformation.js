const Sequelize = require('sequelize')
const { db } = require('../database/dbConfig')

const Schema = db.define("MemoryInformation", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    total_memory: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    free_memory: {
        type: Sequelize.STRING,
        allowNull: false
    },
    maximum_heap_size:{
        type: Sequelize.STRING,
    },
    HealthFacilityFosid: {
        type: Sequelize.STRING 
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    tableName: 'memory_information'
})

module.exports = Schema