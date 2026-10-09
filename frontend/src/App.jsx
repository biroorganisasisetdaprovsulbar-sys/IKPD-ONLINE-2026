import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";


function App() {

return (

<Routes>

<Route
path="/login"
element={<Login />}
/>


<Route
path="/"
element={<Dashboard />}
/>


</Routes>

)

}


export default App;
