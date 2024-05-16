// Import necessary modules
const { DataTypes } = require("sequelize");
const { sequelize } = require("./"); // Assuming you have sequelize initialized in a separate file

module.exports = (sequelize, DataTypes) => {
    const DietAssignment = sequelize.define('DietAssignment', {
        diet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Diets', // Assuming 'Diets' is your Diet model table name
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Registers', // Assuming 'Registers' is your User model table name
                key: 'id'
            }
        }
    });

    return DietAssignment;
}