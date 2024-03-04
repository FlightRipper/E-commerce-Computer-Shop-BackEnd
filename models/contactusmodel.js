import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';

const ContactUs = sequelize.define('ContactUs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

ContactUs.sync();

export default ContactUs;