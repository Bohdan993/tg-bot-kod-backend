const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true, allowNull: false },
    name: {type: DataTypes.STRING(30)},
    lastName: {type: DataTypes.STRING(30)},
    phone: {type: DataTypes.STRING(12)},
    userName: {type: DataTypes.STRING(30)},
    isBookedService: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    lastBookingDate: {type: DataTypes.DATEONLY, defaultValue: null},
});

module.exports = User;

