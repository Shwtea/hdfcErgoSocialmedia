const mongoose = require("mongoose");
//const { productSchema } = require("./products");

const userPostSchema = mongoose.Schema({
  user_id: {
    required: true,
    type: Object,
  },
  post_message: {
    required: true,
    type: String,
    trim: true,
  },
  previous_message:[
    {
        message: {
            type:String
        }
    }
  ],
  is_active: {
    type: Boolean,
    default: 1,
  },
});

const UserPost = mongoose.model("UserPost", userPostSchema);
module.exports = UserPost;