const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Song: sequelize.define("song", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        track: DataTypes.STRING,
        artist: DataTypes.STRING,
        albumCover: DataTypes.TEXT
    })
}