import Cart from "../models/cartmodel";
import Order from "../models/ordermodel";
import Product from "../models/productmodel";
import ContactUs from "../models/contactusmodel";
import SubCategory from "../models/subcategorymodel";
import User from "../models/usermodel";
import Post from "../models/postmodel";
import Category from "../models/categorymodel";


Category.hasMany(SubCategory);
SubCategory.belongsTo(Category, { foreignKey: 'CategoryId' });

Product.belongsTo(SubCategory, { foreignKey: 'subcategoryId' });

User.hasMany(Post);
Post.belongsTo(User, { foreignKey: 'UserId' });

User.hasMany(Order);
Order.belongsTo(User, {foreignKey: 'UserId'});

Product.hasMany(Cart);
Cart.belongsTo(Product, {foreignKey: 'ProductId'});

Order.hasMany(Cart);
Cart.belongsTo(Order, {foreignKey: 'OrderId'});