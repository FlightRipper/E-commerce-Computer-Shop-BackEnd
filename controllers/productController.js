import Product from "../models/productmodel.js" ;
import SubCategory from "../models/subcategorymodel.js";
import Category from "../models/categorymodel.js";
import fs from 'fs';
import path from 'path';

class ProductController {

    static async createProduct(req, res){
        try {
            const image = req.file.filename;
            const { name, price, description, quantity, subcategoryId } = req.body;
            if (!name || !price || !description || !quantity || !subcategoryId || !image) {
              return res.status(400).json({ error: "All fields are required" });
            }
            const product = await Product.create({ ...req.body, image: image });
            await product.save();
            res.status(200).json(product);
        } catch (error) {
        res.status(400).json({ error: error });
        }
    }

    static getAllProducts = async (req, res) => {
        try {
            const products = await Product.findAll();
            if (products.length === 0) {
                return res.status(404).json('there are no available memes');
            }
            for (let i = 0; i < products.length; i++) {
                const subCategory = await SubCategory.findByPk(products[i].subcategoryId);
                const category = await Category.findByPk(subCategory.CategoryId);
                const productPlainObject = products[i].toJSON();
                productPlainObject.categoryId = category.id;
                products[i] = productPlainObject;
            }
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getProduct(req, res) {
        try{
            const product = await Product.findByPk(req.params.id);
            if(!product) return res.status(404).json("product not found")
            return res.status(200).json(product)
        }
        catch(error){return res.status(500).json({ message: error.message });}
    }

    static async deleteProduct(req, res){
        try{
            const product = await Product.findByPk(req.params.id);
            if(!product) return res.status(404).json("product not found")
            await Product.destroy({where:{id:req.params.id,}})
            return res.status(200).json({product})
        }catch(error){return res.status(500).json({message: error.message})}
    }

    //update product
    static async updateProduct(req, res) {
        try {
        const oldProduct = await Product.findByPk(req.params.id);
        console.log(req.body)

        const [upatedProduct] = await Product.update(...req.body, {
            where: {
            id: req.params.id,
            },
        });

        if (!upatedProduct) {
            return res.status(404).json("please enter the fields you want to edit");
        }

        const newProduct = await Product.findByPk(req.params.id);
        return res.status(200).json(newProduct);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    static async updateProductquantity(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'product not found' });
            }
            product.quantity = req.body.quantity - product.quantity;
            await product.save();
            res.status(200).json({ message: 'quantity updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async UpdateProductImage(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'product not found' });
            }
            if (fs.existsSync(product.image)) {
                fs.unlinkSync(product.image);
            }
            product.image = req.file.filename;
            console.log(req.file.filename);
            await product.save();
            res.status(200).json({ message: 'Image replaced successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async getFeauturedProducts(req, res){
        try{
            const products = await Product.findAll({where: {featured: true}});
            if(products.length === 0) return res.status(404).json({error: "there are no featured products"});
            return res.status(200).json(products);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    static async getSubcategoryProducts(req, res){
        try{
            console.log(req.params.id);
            const subcategory = await SubCategory.findByPk(req.params.id);
            if(!subcategory) return res.status(404).json({message: "subcategory not found"});
            const products = await Product.findAll({where: {subcategoryId: req.params.id}});
            if(products.length === 0) return res.status(404).json({error: "there are no products in this subcategory"});
            return res.status(200).json(products);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

}

export default ProductController