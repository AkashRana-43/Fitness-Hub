const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const {Register } = require("../models");

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        current_height: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        current_weight: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        body_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        goal_weight: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        goal_body_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profile_image: {
            type: DataTypes.STRING, // Assuming store the file path
            allowNull: true,
        },

    });
    // Define associations if needed
    Profile.associate = (models) => {
         Profile.belongsTo(models.Register, { foreignKey: 'user_id', as: 'user'});
     };

    return Profile;
};