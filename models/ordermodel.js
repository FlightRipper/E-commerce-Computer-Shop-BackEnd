import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';
import User from './usermodel.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    status:{
        type: DataTypes.ENUM('pending', 'approved', 'done', 'canceled', 'active'),
        defaultValue: 'active',
    }
});

User.hasMany(Order);
Order.belongsTo(User, {foreignKey: 'UserId'});

Order.sync();

export default Order;