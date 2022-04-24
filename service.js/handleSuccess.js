const headers = require('./headers');
const handleSuccess = (req,res,data)=>{
  res.writeHead('200',headers);
  res.write(JSON.stringify({
    status:'success',
    data
  }))
  res.end()
}
module.exports = handleSuccess