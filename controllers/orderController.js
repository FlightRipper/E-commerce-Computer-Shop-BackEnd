import Order from "../models/ordermodel.js";
import User from "../models/usermodel.js";
import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";
class OrderController{

    static async createOrder(req, res){
        try{
            const { message, UserId } = req.body;
            const foundOrder = await User.findOne({
                where: {
                    id: UserId,
                },
            })
            if(!foundOrder) return res.status(404).json({error: "user not found"});
            console.log(message, UserId);
            const order = await Order.create({ message: message, UserId: UserId });
            await order.save();
            res.status(200).json(order);
        }catch(error){
            res.status(400).json({ error: error });
        }
    }

    static async updateOrderStatus(req, res){
        try{
            const {status} = req.body;
            const id = req.params.id;
            if(!status) return res.status(400).json({error: "all fields are required"});
            const foundOrder = await Order.findOne({
                where: {
                    id: id,
                },
            })
            if(!foundOrder) return res.status(404).json({error: "order not found"});
            foundOrder.status = status;
            foundOrder.save();
            return res.status(200).json(foundOrder);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    static async getOrder(req, res){
        try{
            const order = await Order.findByPk(req.params.id);
            if(!order) return res.status(404).json({error: "order not found"});
            return res.status(200).json(order);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    static async getAllOrders(req, res){
        try{
            const orders = await Order.findAll();
            if(orders.length === 0) return res.status(404).json({error: "there are no orders"});
            return res.status(200).json(orders);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    static async getOrdersOfUser(req, res){
        try{
            const orders = await Order.findAll({where: {UserId: req.params.id}});
            if(orders.length === 0) return res.status(404).json({error: "there are no orders"});
            return res.status(200).json(orders);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    static async cancelOrder(req, res){
        try{
            const foundOrder = await Order.findOne({
                where: {
                    id: req.params.id,
                },
            })
            if(!foundOrder) return res.status(404).json({error: "order not found"});
            const updatedOrder = await Order.update({status: "cancelled"}, {
                where: {
                    id: req.params.id,
                }
            });
            return res.status(200).json(updatedOrder);
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteOrder(req, res){
        try{
            const order = await Order.findByPk(req.params.id);
            if(!order) return res.status(404).json({error: "order not found"});
            await Order.destroy({where: {id: req.params.id}});
            return res.status(200).json({order});
        }catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    static getActiveOrders = async (req, res) => {
        try {
            const orders = await Order.findOne({ where: { status: "active", UserId: req.params.id } });
            if (!orders) return res.status(404).json({ error: "there are no active orders" });
            const cartproducts = await Cart.findAll({ where: { OrderId: orders.id } });
            const products = await Promise.all(cartproducts.map(async (cartProduct) => {
                const product = await Product.findByPk(cartProduct.ProductId);
                const productPlainObject = product.toJSON();
                productPlainObject.cartID = cartProduct.id;
                productPlainObject.orderID = orders.id;
                productPlainObject.cartQuantity = cartProduct.quantity;
                return productPlainObject;
            }));
            console.log(products)
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default OrderController