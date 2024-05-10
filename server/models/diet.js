// Import necessary modules
const { DataTypes } = require("sequelize");
const { sequelize } = require("./"); // Assuming you have sequelize initialized in a separate file

// Define the Diet model
module.exports = (sequelize, DataTypes) => {
    const Diet = sequelize.define('Diet', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        meal_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        meal_type: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        meal_type: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        protein: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        carbohydrates: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        fat: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        fiber: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    });

    Diet.associate = (models) => {
        Diet.belongsTo(models.Register, { foreignKey: 'user_id', as: 'user'});
    };

    return Diet;
}
