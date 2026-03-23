import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
     title:{type:String, required:true},
    excerpt:{type:String, required:true},
    content:{type:String, required:true},
    author:{type:String, required:true},
    image:{type:String, required:true},
    category:{type:String, required:true},
    authorId: {type: String, required: true}



  },
  { timestamps: true }
);

export const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);