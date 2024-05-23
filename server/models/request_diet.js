// Import necessary modules
const { DataTypes } = require("sequelize");
const { sequelize } = require("./"); // Assuming you have sequelize initialized in a separate file

module.exports = (sequelize, DataTypes) => {
    const RequestDiet = sequelize.define('RequestDiet', {
        requested_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        requested_to: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {            
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });

    // Associations can also be defined here if necessary
    RequestDiet.associate = function(models) {
        RequestDiet.belongsTo(models.Register, { foreignKey: 'requested_by', as: 'Requester' });
        RequestDiet.belongsTo(models.Register, { foreignKey: 'requested_to', as: 'Requestee' });
    };

    return RequestDiet;
};

