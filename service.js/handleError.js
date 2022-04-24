const headers = require('./headers');
const error = (req,res,message)=>{
  res.writeHead('400',headers);
  res.write(JSON.stringify({
    status:'success',
    message
  }))
  res.end()
}
module.exports = error;