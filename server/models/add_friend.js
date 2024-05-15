const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const {Register } = require("../models");


module.exports = (sequelize, DataTypes) => {
    // Define the model for adding friends
    const AddFriend = sequelize.define('AddFriend', {
        // Define attributes of the AddFriend model
        requesterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recipientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
            defaultValue: 'pending',
            allowNull: false,
        }
    });

    // Define associations if needed
    AddFriend.associate = (models) => {
        AddFriend.belongsTo(models.Register, { foreignKey: 'requesterId', as: 'requester' });
        AddFriend.belongsTo(models.Register, { foreignKey: 'recipientId', as: 'recipient' });
    };

    return AddFriend;
}