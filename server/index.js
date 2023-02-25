const authRouter = require("./routes/auth.js");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const DB = "mongodb+srv://shweta:shwetagupta@cluster0.tp7anxa.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(authRouter);

mongoose.connect(DB).then(() =>{
    console.log("connected successfully");
}).catch(err =>{
    console.log(err);
});

app.listen(PORT , "0.0.0.0" , function(err){
    if(!err)
    {
        console.log(`Connected at ${PORT}`);
    }
});