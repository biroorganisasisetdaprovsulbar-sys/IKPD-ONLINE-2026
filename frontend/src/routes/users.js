const router =
require("express").Router();


const auth =
require("../middleware/auth");


const role =
require("../middleware/role");



const controller =
require("../controllers/userController");





router.get(

"/",

auth,

role(
"Administrator"
),

controller.getUsers

);





router.post(

"/",

auth,

role(
"Administrator"
),

controller.createUser

);





router.delete(

"/:id",

auth,

role(
"Administrator"
),

controller.deleteUser

);



module.exports=router;