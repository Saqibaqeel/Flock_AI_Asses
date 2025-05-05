const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utility/generateToken');

const signUp = async (req, res) => { 
    try {
        const { fullName, email, password } = req.body;

        if (!email || !password || !fullName) return res.status(400).json({ msg: 'Please fill all the fields' });
        

     
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });
        

     
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save(); 

        
        generateToken(newUser._id, res);

   
        res.status(201).json({
            msg: 'User registered successfully',
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({msg:'Please fill all the fields'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({msg:'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        generateToken(user._id, res);
        res.status(200).json({
            msg:'User logged in successfully',
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic
            }
        });
        
    } catch (error) {
        console.log('error while login', error);
        
    }
}
const logout=(req,res)=>{
    res.clearCookie('jwt');
    res.status(200).json({msg:'User logged out successfully'});
}
 const check=(req,res)=>{
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        res.status(200).json({ msg: "User authenticated", user });
    } catch (error) {
        console.error("Error while checking authentication:", error);
        res.status(500).json({ msg: "Server Error" });
    }
  }
  


module.exports={signUp,login,logout,check}; 