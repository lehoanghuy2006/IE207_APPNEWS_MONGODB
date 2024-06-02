const User = require("../models/User");
const bcrypt =require("bcrypt");

const authController = {
    //register
    registerUser: async(req,res)=>{
        console.log("Dữ liệu gửi lên: ", req.body);
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })
            res.status(200).json(user);
        }catch(err){    
            console.log("lỗi 2 :", err);
            res.status(500).json(err);
        }
    },

    //LOGIN
    loginUser: async(req,res)=>{
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json("Tài khoản hoặc mật khẩu không đúng");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
                return res.status(401).json("Sai mật khẩu");
            }
            if(user && validPassword){
                res.status(200).json(user);
            }

        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = authController;