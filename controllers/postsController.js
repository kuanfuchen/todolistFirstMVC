const handleSuccess= require('../service.js/handleSuccess');
const Post = require('../models/postsModel');
const handleError = require('../service.js/handleError');
const postsControllers = {
  getPostsData:async(req,res)=>{
    const data = await Post.find()
    handleSuccess(req,res,data)
  },
  postPostsData:async(req,res,body)=>{
    console.log('111')
    try{
      const post = JSON.parse(body);
      if(post.name && post.tags && post.type && post.content){
        const data = await Post.create(post);
        handleSuccess(req,res,data)
      }else{
        handleError(req,res,'格式不齊全')
      }
    }catch{
      handleError(req,res,'格式錯誤')
    }
  },
  deleteSinglePostsData:async(req,res, id)=>{
    await Post.findByIdAndDelete({_id:id})
    handleSuccess(req,res,'資料已刪除');
  },
  deletePostsData:async(req,res)=>{
    await Post.deleteMany();
    handleSuccess(req,res,'資料庫已清空')
  },
  patchPostsData:async(req,res,id,body)=>{
    try{
      const post = JSON.parse(body);
      const data = await Post.findByIdAndUpdate({_id:id},post,{new:true});
      handleSuccess(req,res,data)
    }catch(err){
      handleError(req,res,'格式不齊全')
    }
    
  }
}
module.exports = postsControllers