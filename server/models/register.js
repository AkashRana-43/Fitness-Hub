const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize, DataTypes) => {
    const Register = sequelize.define("Register", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Assuming default is not verified
        },
        is_blocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });

    return Register;
};