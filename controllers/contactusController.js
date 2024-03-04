import ContactUs from "../models/contactusmodel.js";

export default class ContactUsController{
    static async createContactUs(req, res){
        try {
            const {message, name, email} = req.body;
            if (!message || !name || !email) {
                return res.status(400).json({ error: "All fields are required" });
            }
            const contactus = await ContactUs.create({ ...req.body });
            await contactus.save();
            res.status(200).json(contactus);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    static async getContactUs(req, res) {
        try{
            const contactus = await ContactUs.findByPk(req.params.id);
            if(!contactus) return res.status(404).json("contactus not found")
            return res.status(200).json(contactus)
        }
        catch(error){return res.status(500).json({ message: error.message })}
    }

    static async getAllContactUs(req, res) {
        try {
            const contactus = await ContactUs.findAll();
            if (contactus.length === 0) {
            return res.status(404).json('there are no available messages');
            }
            return res.status(200).json(contactus);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async deleteContactUs(req, res){
        try{
            const contactus = await ContactUs.findByPk(req.params.id);
            if(!contactus) return res.status(404).json("contactus not found")
            await ContactUs.destroy({where:{id:req.params.id,}})
            return res.status(200).json({contactus})
        }catch(error){return res.status(500).json({message: error.message})}
    }
}