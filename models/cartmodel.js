import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';
import Product from './productmodel.js';
import Order from './ordermodel.js';

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalprice:{
        type: DataTypes.INTEGER,
    }
});



Cart.sync();

export default Cart;