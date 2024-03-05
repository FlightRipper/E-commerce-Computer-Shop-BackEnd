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

Product.hasMany(Cart);
Cart.belongsTo(Product, {foreignKey: 'ProductId'});

Order.hasMany(Cart);
Cart.belongsTo(Order, {foreignKey: 'OrderId'});

Cart.sync();

export default Cart;