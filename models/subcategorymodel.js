// subcategorymodel.js
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
}, {
    hooks: {
        beforeDestroy(instance, options) {
            return instance.getProducts().then(products => {
                products.forEach(product => product.destroy());
            });
        }
    }
});

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category, { foreignKey: 'CategoryId' });

SubCategory.sync();

export default SubCategory;
