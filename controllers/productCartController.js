import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";
import Order from "../models/ordermodel.js";

export default class CartController {

    static CreateCart = async (req, res) => {

        try {
            console.log(req.body);
            const { ProductId, quantity, UserId } = req.body;
            let activeOrder = await Order.findOne({ where: { status: 'active' } });
            if (!activeOrder) {
                activeOrder = await Order.create({ status: 'active', UserId: UserId });
            }
            const product = await Product.findByPk(ProductId);
            if (!product) return res.status(404).json({ message: "Product not found" });
            const ProductPrice = product.price;
            const totalPrice = ProductPrice * quantity;
            const cart = await Cart.create({ quantity: quantity, totalprice: totalPrice, ProductId: ProductId, OrderId: activeOrder.id });
            
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    }

    static async deleteCart(req, res){
        try{
            const cart = await Cart.findByPk(req.params.id)
            if(!cart) return res.status(404).json({message: "CartProduct not found"})
            await Cart.destroy({where:{id:req.params.id}})
            return res.status(200).json({cart})
        }catch(error){return res.status(500).json({message: error.message});}
    }

    static async getCart(req, res){
        try{
            const cart = await Cart.findByPk(req.params.id)
            if(!cart) return res.status(404).json({message: "CartProduct not found"})
            return res.status(200).json(cart)
        }catch(error){return res.status(500).json({message: error.message});}
    }

    static async getAllCarts(req, res){
        try{
            const carts = await Cart.findAll({where:{OrderId: req.params.id}})
            if(carts.length === 0) return res.status(404).json({message: "CartProduct not found"})
            return res.status(200).json(carts)
        } catch(error){return res.status(500).json({message: error.message});}
    }
}