import React from "react";

import {
Navigate
} from "react-router-dom";



const ProtectedRoute = ({
children,
allowedRoles=[]
})=>{


const user = JSON.parse(
localStorage.getItem("user")
) || {};



const role = user.role || "";



if(!allowedRoles.includes(role)){


return (

<Navigate
to="/dashboard"
/>

);


}



return children;



};


export default ProtectedRoute;