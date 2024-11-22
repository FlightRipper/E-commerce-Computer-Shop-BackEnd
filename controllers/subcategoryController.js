import SubCategory from "../models/subcategorymodel.js";
import Category from "../models/categorymodel.js";
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

    static async getAllSubCategories(req, res) {
        try {
            const subcategories = await SubCategory.findAll({
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'name']
                    }
                ]
            });
    
            if (subcategories.length === 0) {
                return res.status(404).json('No subcategories found');
            }
    
            // Format the response to include category info
            const formattedSubcategories = subcategories.map(subcategory => ({
                ...subcategory.toJSON(),
                Category: subcategory.Category ? {
                    id: subcategory.Category.id,
                    name: subcategory.Category.name
                } : null
            }));
    
            return res.status(200).json(formattedSubcategories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    
    
    static async deleteSubCategory(req, res) {
        try {
          const subcategoryId = req.params.id;
          const deletedCount = await SubCategory.destroy({ where: { id: subcategoryId } });
      
          if (deletedCount === 0) {
            return res.status(404).json({ message: "SubCategory not found" });
          }
      
          return res.status(204).json({ message: "SubCategory successfully deleted" });
        } catch (error) {
          console.error("Error deleting Subcategory:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      }

      static async editSubCategory(req, res) {
        try {
            const subcategoryId = req.params.id;
            const { name, CategoryId } = req.body;

            if (!name || !CategoryId) {
                return res.status(400).json({ error: "Both name and CategoryId are required" });
            }

            const subcategory = await SubCategory.findByPk(subcategoryId);
            if (!subcategory) {
                return res.status(404).json({ message: "Subcategory not found" });
            }

            // Check if the provided CategoryId exists
            const category = await Category.findByPk(CategoryId);
            if (!category) {
                return res.status(400).json({ message: "Invalid CategoryId" });
            }

            // Update the subcategory
            subcategory.name = name;
            subcategory.CategoryId = CategoryId;
            await subcategory.save();

            return res.status(200).json(subcategory);
        } catch (error) {
            console.error("Error editing Subcategory:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

}

export default SubCategoryController