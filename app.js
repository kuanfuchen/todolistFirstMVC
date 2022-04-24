const routes = require('./routes')
require('./connections')
const app = (req, res)=>{
  routes(req,res);
}
module.exports = app;