const router =
require("express").Router();


const auth =
require("../middleware/auth");


const controller =
require("../controllers/indikatorController");




router.get(

"/",

auth,

controller.getIndikator

);



router.post(

"/",

auth,

controller.createIndikator

);



router.delete(

"/:id",

auth,

controller.deleteIndikator

);



module.exports=router;