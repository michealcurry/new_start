import React from "react";
import { useRoutes } from "react-router-dom";
import './App.less'
import routes from "./routes";


function App(){

    const element = useRoutes(routes)
    
    return(
    <>
        {element}
    </>)

}


export default App