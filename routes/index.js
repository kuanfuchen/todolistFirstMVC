const postsControllers = require('../controllers/postsController');
const httpsControllers = require('../controllers/https');
const routes = (req,res)=>{
  const {url ,method} = req;
  let body = '';
  req.on('data',chunk=> body += chunk);
  if(url==='/posts' && method==='GET'){
    postsControllers.getPostsData(req,res)
  }else if(url==='/posts' && method==='POST'){
    req.on('end',()=>{
      postsControllers.postPostsData(req,res,body)
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
      const id = url.split('/').pop();
      postsControllers.patchPostsData(req,res,id,body);
    })
  }else{
    httpsControllers.errorParam(req,res)
  }
}
module.exports = routes;