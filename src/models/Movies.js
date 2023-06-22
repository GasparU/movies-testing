const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Movies = sequelize.define('movies', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});


module.exports = Movies;