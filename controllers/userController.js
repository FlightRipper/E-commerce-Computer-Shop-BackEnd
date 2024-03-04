import User from '../models/usermodel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "10d" });
};

class userController {

    static async createUser(req, res){
        try{
            const image = req.file.filename;
            const { username, password, email, phonenumber, address } = req.body;
            console.log(username, password, email, phonenumber, address, image);
            const errors = [];
            if (!password) {
                errors.push("Password is required");
            } else if (!validator.isStrongPassword(password)) {
                errors.push("Password not strong enough");
            }
    
            if (!username) {
                errors.push("Username is required");
            }

            if (!email) {
                errors.push("email is required");
            }

            if (!phonenumber) {
                errors.push("phonenumber is required");
            }

            if (!address) {
                errors.push("address is required");
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const existingUser = await User.findOne({
            where: {
                username: username,
            },
            });
            console.log(existingUser, "hon")
            if (existingUser) {
            errors.push("Username already exists");
            return res.status(400).json({message: "Username already exists"});
            }

            const newUser = await User.create({
                ...req.body, image: image
            });
            console.log(newUser)
            if (!newUser) {
            errors.push("Error creating user");
            return  res.status(500).json({ errors });
            }

            const token = createToken(newUser.id);
            return res.status(201).json({ newUser, token });
        }
        catch(error){
            return res.status(500).json({ message: error.message });
        }
    }

    //login user
    static async loginUser(req, res) {
        try {
        const { username, password } = req.body;

        const errors = [];
        let user;
        let match;

        if (!username || !password) {
            errors.push("Please Fill all required fields");
        } else {
            user = await User.findOne({ where: { username } });
            if (!user) {
            errors.push("user not found");
            } else {
            match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.push("incorrect password");
            }
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const token = createToken(user.id);
        return res.status(200).json({ username, userType:user.userType, token, balance:user.balance });
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //get all users
    static async getAllUsers(req, res) {
        try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).json("there are no available users");
        }
        return res.status(200).json(users);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //update a user by id
    static async updateUser(req, res) {
        try {
        const [updatedUser] = await User.update(req.body, {
            where: {
            id: req.params.id,
            },
        });
        if (!updatedUser) {
        return res.status(404).json('please enter the fields you want to edit');
        }
        const user= await User.findByPk(req.params.id);
        return res.status(200).json(user);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //delete a user
    static async deleteUser(req, res) {
        try {
        const deleteduser = await User.findByPk(req.params.id)

        if (!deleteduser) {
        return res.status(404).json('the user was not found');
        }

        await User.destroy({
            where:{
            id:req.params.id,
            },
        })

        return res.status(200).json({ deleteduser });
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //find user by id
    static async findUserById(req, res) {
        try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json('user not found');
        }
        return res.status(200).json(user);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    static async UpdateUserProfile(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            console.log(user.image);
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            if (fs.existsSync(user.image)) {
                fs.unlinkSync(user.image);
            }
            user.image = req.file.filename;
            console.log(req.file.filename);
            await user.save();
            res.status(200).json({ message: 'Image replaced successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

export default userController;