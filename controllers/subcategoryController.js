import SubCategory from "../models/subcategorymodel.js";

class SubCategoryController {

    static async createSubCategory(req, res){
        try {
            const categoryId = req.params.id;
            console.log(categoryId);
            console.log(req.body);
            const name = req.body;
            if (!name) {
            return res.status(400).json({ error: "All fields are required" });
            }
        
            const subcategory = await SubCategory.create({ ...req.body, CategoryId: categoryId });
        
            await subcategory.save();
            res.status(200).json(subcategory);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    }

    static async getSubCategory(req, res) {
        try{
            const subcategory = await SubCategory.findByPk(req.params.id);
            if(!subcategory) return res.status(404).json("subcategory not found")
            return res.status(200).json(subcategory)
        }
        catch(error){return res.status(500).json({ message: error.message })}
    }

    static async getAllSubCategories(req, res) {
        try {
            const subcategories = await SubCategory.findAll({where:{CategoryId:req.params.id}});
            if (subcategories.length === 0) {
            return res.status(404).json('there are no available memes');
            }
            return res.status(200).json(subcategories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getAllSubCategoriesTotal(req, res) {
        try {
            const subcategories = await SubCategory.findAll();
            if (subcategories.length === 0) {
            return res.status(404).json('there are no available memes');
            }
            return res.status(200).json(subcategories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default SubCategoryController