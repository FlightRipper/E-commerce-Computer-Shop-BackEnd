import Category from "../models/categorymodel.js";

class categoryController {

    static async createCategory(req, res){
        try{
            const catName = req.body.name
            console.log(catName)
            const existingCategory = await Category.findOne({
                where: {
                    name: catName,
                },
            });
            if (existingCategory) {
                return res.status(404).json("Category already exists");
            }
            const category = await Category.create({name: catName})
            return res.status(200).json(category);
        } catch(err) {
            return res.status(500).json({message: err.message});
        }
    }

    static async getAllCategories(req, res){
        try{
            const categories = await Category.findAll()
            if (categories.length === 0) {
                return res.status(404).json('there are no available memes');
            }
            console.log(categories)
            return res.status(200).json(categories);
        } catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    static async getCategory(req, res){
        try{
            const categories = await Category.findByPk(req.params.id)
            if (!categories) return res.status(404).json('there are no available')
            return res.status(200).json(categories);
        } catch(error){
            return res.status(500).json({message: error.message});
        }
    }    
}

export default categoryController