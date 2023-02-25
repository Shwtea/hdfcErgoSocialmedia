const express = require("express");
const User = require("../models/user");
const UserPost = require("../models/userPost")
const authRouter = express.Router();




//yup jy

// create user: creating a user

authRouter.post("/api/user", async (req, res) => {
  console.log("**********/api/signup request***********");
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email is already present" });
    }
    // const hashPassword = await bcryptjs.
    // hash(password, 8)
    let user = new User({
      name,
      email,
      password
    });
    
    user = await user.save();
    // const token =  jwt.sign({id : user._id} , "passwordKey");
    //  console.log({ token, ...user._doc });
    return res.json({ user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data

authRouter.get("/api/user/:_id",  async (req, res) => {
  const user = await User.findById(req.params._id);
  res.json(user);
});

// create post: creating a post

authRouter.post("/api/:user_id/post", async (req, res) => {
  console.log("**********/api/signup request***********");
  try {
    const { post_message } = req.body;
    const user_id = req.params.user_id;
    const existingUser = await UserPost.findOne({ user_id });
    // if(existingUser){

    // }
      let userPost = new UserPost({
        user_id,
        post_message,
      });
      
      userPost = await userPost.save();
      for(i=0;i<userPost.previous_message.length;i++){
        let userPostab = await UserPost.findByIdAndUpdate(userPost._id, { $push: { "previous_message": { "message": userPost.post_message }}});
      //let userPostab =await UserPost( { "_id" : userPost._id }, { $push: { "previous_message": { "message": userPost.post_message }}} ) 
      // userPostab = await userPostab.save();
      console.log(userPostab);
      }
      

      return res.json(userPostab);
    
    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// edit post: editing a post

authRouter.put("/api/post/:post_id", async (req, res) => {
  console.log("**********/api/edit post request***********");
  try {
    const { post_message } = req.body;
    const post_id = req.params.post_id;
    let userPost = await UserPost.findByIdAndUpdate(post_id, { post_message:post_message });
    userPost = await userPost.save();
    return res.json({userPost});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// delete post: deleting a post

authRouter.delete("/api/post/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;
    let userPost = await UserPost.findByIdAndUpdate(post_id, { is_active:false });
    userPost = await userPost.save();
    return res.json({userPost});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get all post by user id

authRouter.get("/api/post/:user_id",  async (req, res) => {
  const userPost = await UserPost.find({user_id:req.params.user_id,is_active:true});
  res.json(userPost);
});

module.exports = authRouter;
