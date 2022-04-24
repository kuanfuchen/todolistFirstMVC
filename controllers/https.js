const headers = require('../service.js/headers');
const controllers = {
  cors:(req,res)=>{
    res.writeHead('200',headers);
    res.end()
  },
  errorParam:(req,res)=>{
    res.writeHead('404',headers);
    res.write(JSON.stringify({
      status:'success',
      message:'錯誤網址路徑'
    }))
    res.end()
  }
}
module.exports = controllers