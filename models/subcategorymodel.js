import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';
import Category from "./categorymodel.js";

const SubCategory = sequelize.define('SubCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category);

SubCategory.sync();

export default SubCategory;