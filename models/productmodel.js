import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';
import SubCategory from "./subcategorymodel.js";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    featured:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

Product.belongsTo(SubCategory, { foreignKey: 'subcategoryId' });

Product.sync();

export default Product;

