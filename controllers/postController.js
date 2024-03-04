import Post from "../models/postmodel.js";
import User from "../models/usermodel.js";

export default class PostController{
    static async createPost(req, res){
        try {
            const image = req.file.filename
            console.log(image, req.body);
            const {description, UserId} = req.body;
            console.log(description, image, UserId)
            if (!description || !image || !UserId) {
                return res.status(400).json({ error: "All fields are required" });
            }
            const post = await Post.create({ ...req.body, image:image });
            await post.save();
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getuserPosts(req, res){
        try{
            const posts = await Post.findAll({where:{UserId:req.params.id}});
            if (posts.length === 0) {
                return res.status(404).json('there are no available posts');
            }
            return res.status(200).json(posts);
        } catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    static getallposts = async (req, res) => {
        try {
            const posts = await Post.findAll({
                include: [{
                    model: User,
                    attributes: ['username', 'image']
                }]
            });
            if (posts.length === 0) {
                return res.status(404).json('there are no available posts');
            }
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getPost(req, res){
        try{
            const post = await Post.findByPk(req.params.id);
            if(!post) return res.status(404).json("post not found")
            return res.status(200).json(post)
        }
        catch(error){return res.status(500).json({ message: error.message })}
    }

    static async deletePost(req, res){
        try{
            const post = await Post.findByPk(req.params.id);
            if(!post) return res.status(404).json("post not found")
            await Post.destroy({where:{id:req.params.id,}})
            return res.status(200).json({post})
        }catch(error){return res.status(500).json({message: error.message})}
    }

    static async updatePost(req, res){
        try{
            const post = await Post.findByPk(req.params.id);
            if(!post) return res.status(404).json("post not found")
            post.description = req.body.description
            return res.status(200).json(updatedPost)
        }catch(error){return res.status(500).json({message: error.message})}
    }

    static async updatePostimage(req, res){
        try{
            const post = await Post.findByPk(req.params.id);
            if(!post) return res.status(404).json("post not found")
            post.image = req.file.filename
            return res.status(200).json(updatedPost)
        }catch(error){return res.status(500).json({message: error.message})}
    }
}