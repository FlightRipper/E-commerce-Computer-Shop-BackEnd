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



    static async updateCategory(req, res) {
        try {
          const categoryId = req.params.id;
          const updatedCount = await Category.update({ name: req.body.name }, { where: { id: categoryId } });
          
          if (updatedCount === 0) {
            return res.status(404).json({ message: "Category not found" });
          }
      
          return res.status(200).json({ message: "Category updated successfully" });
        } catch (error) {
          console.error("Error updating category:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      }
      
      static async deleteCategory(req, res) {
        try {
          const categoryId = req.params.id;
          const deletedCount = await Category.destroy({ where: { id: categoryId } });
      
          if (deletedCount === 0) {
            return res.status(404).json({ message: "Category not found" });
          }
      
          return res.status(204).json({ message: "Category successfully deleted" });
        } catch (error) {
          console.error("Error deleting category:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      }
      
}

export default categoryController