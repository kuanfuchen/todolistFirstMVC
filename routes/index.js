const postsControllers = require('../controllers/postsController');
const httpsControllers = require('../controllers/https');
const handleError = require('../service.js/handleError');
const routes = (req,res)=>{
  const {url ,method} = req;
  let body = '';
  req.on('data',chunk=> body += chunk);
  if(url==='/posts' &&method==='GET'){
    postsControllers.getPostsData(req,res)
  }else if(url==='/posts' && method==='POST'){
    req.on('end',()=>{
      try{
        const post = JSON.parse(body);
        if(post.name && post.tags && post.type && post.content){
          postsControllers.postPostsData(req,res,post)
        }else{
          handleError(req,res,'格式不齊全')
        }
      }catch(err){
        handleError(req,res,'格式錯誤')
      }
    });
  }else if(url==='/posts' &&method==='OPTIONS'){
    httpsControllers.cors(req,res);
  }else if(url==='/posts' && method==='DELETE'){
    postsControllers.deletePostsData(req,res);
  }else if(url.startsWith('/posts/') && method==='DELETE'){
    const id = url.split('/').pop();
    postsControllers.deleteSinglePostsData(req,res,id)
  }else if(url.startsWith('/posts/') && method==='PATCH'){
    req.on('end',()=>{
      try{
        const post = JSON.parse(body);
        const id = url.split('/').pop();
        postsControllers.patchPostsData(req,res,id,post)
      }catch{
        handleError(req,res,'格式錯誤')
      }
    })
  }else{
    httpsControllers.errorParam(req,res)
  }
}
module.exports = routes;