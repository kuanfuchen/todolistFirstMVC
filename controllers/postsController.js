const handleSuccess= require('../service.js/handleSuccess');
const Post = require('../models/postsModel');
const postsControllers = {
  getPostsData:async(req,res)=>{
    const data = await Post.find()
    handleSuccess(req,res,data)
  },
  postPostsData:async(req,res,post)=>{
    const data = await Post.create(post);
    handleSuccess(req,res,data)
  },
  deleteSinglePostsData:async(req,res, id)=>{
    await Post.findByIdAndDelete({_id:id})
    handleSuccess(req,res,'資料已刪除');
  },
  deletePostsData:async(req,res)=>{
    await Post.deleteMany();
    handleSuccess(req,res,'資料庫已清空')
  },
  patchPostsData:async(req,res,id,post)=>{
    const data = await Post.findByIdAndUpdate({_id:id},post,{new:true});
    handleSuccess(req,res,data)
  }
}
module.exports = postsControllers