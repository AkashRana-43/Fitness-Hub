const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,

        },
    });
    // const Register = sequelize.models.Register;
    //     // Define association to the Register model
    // Posts.belongsTo(sequelize.models.Register, { foreignKey: 'user_id' });
    return Posts;
};