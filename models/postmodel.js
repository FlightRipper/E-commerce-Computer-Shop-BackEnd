import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';
import User from "./usermodel.js";

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.hasMany(Post);
Post.belongsTo(User, { foreignKey: 'UserId' });

Post.sync();

export default Post;

