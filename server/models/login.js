const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("Login", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        session_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expiry: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: false,
        }

    });
    return Login;
};