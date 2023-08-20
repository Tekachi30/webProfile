const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN



const getUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password, avatar_url} = req.body;
        const exsitUser = await User.findOne({where:{email: email}});
        if(!exsitUser){
            let salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt);

            const user = await User.create({
                username:username,
                email:email,
                password:hash,
                avatar_url:avatar_url,
                isactive:true
            })
            return res.status(200).json({messsage: 'Đăng ký thành công'});
        }else{
            return res.status(400).json({messsage: 'Tài khoản đã tồn tại'});
        }
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const exsitUser = await User.findOne({where:{email: email}});
        if(exsitUser){
            const ismatch = await bcrypt.compare(password, exsitUser.password);
            if(!ismatch){

            }
            // Tạo JWT
            const token = jwt.sign({
                userId: exsitUser.id
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            });
            res.status(200).json({
                username: exsitUser.username,
                email: exsitUser.email,
                avatar_url: exsitUser.avatar_url,
                token
            })
        }else{
            return res.status(400).json({messsage: 'Tài khoản không tồn tại'});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUser,
    register,
    login
  };