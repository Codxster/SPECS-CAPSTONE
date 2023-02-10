const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Rating: sequelize.define("savedSong", {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        desc: DataTypes.TEXT
    })
}