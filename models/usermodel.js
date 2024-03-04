import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
    },
    userType: {
        type: DataTypes.ENUM('verified', 'admin'),
        defaultValue: 'verified'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phonenumber:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.sync();

export default User;
