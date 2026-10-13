const router =
require("express").Router();


const auth =
require("../middleware/auth");


const upload =
require("../config/upload");



const controller =
require("../controllers/buktiController");




router.get(

"/",

auth,

controller.getBukti

);





router.post(

"/",

auth,

upload.single("file"),

controller.uploadBukti

);





router.delete(

"/:id",

auth,

controller.deleteBukti

);




module.exports=router;