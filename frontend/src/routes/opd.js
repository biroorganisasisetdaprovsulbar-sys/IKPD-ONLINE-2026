const router =
require("express").Router();


const auth =
require("../middleware/auth");


const controller =
require("../controllers/opdController");



router.get(

"/",

auth,

controller.getOPD

);



router.post(

"/",

auth,

controller.createOPD

);



router.delete(

"/:id",

auth,

controller.deleteOPD

);



module.exports=router;