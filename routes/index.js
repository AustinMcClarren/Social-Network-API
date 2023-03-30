const router = require('express').Router();
const apiRoutes = require('./api'); //MAIN ROUTES HAS /API 

router.use('/api',apiRoutes); //BRING IN ROUTER

// router.use((req,res) =>{
//     return res.send('wrong route!')
// });

module.exports = router;