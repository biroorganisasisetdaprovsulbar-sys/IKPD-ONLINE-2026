import React from "react";


export default function RoleGuard({

allowed=[],

children

}){


const user =

JSON.parse(

localStorage.getItem("user")

);




if(

!allowed.includes(

user?.role

)

){


return(

<div>

Anda tidak memiliki akses

</div>

);


}




return children;


}