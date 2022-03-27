import { Navigate } from "react-router";
import Login from "../pages/Login/Login";
import Admin from "../pages/Admin/Admin";
import Category from "../components/Category/Category";
import Bar from "../components/Charts/Bar";
import Pie from "../components/Charts/Pie";
import Line from "../components/Charts/Line";
import Home from "../components/Home/Home";
import Product from "../components/Product/Product"
import Role from "../components/Role/Role"
import User from "../components/User/User"


const routes = [
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/admin',
        element:<Admin/>,
        children:[
            {
                path:'home',
                element:<Home/>,
            },
            {
                path:'category',
                element:<Category/>,
            },
            {
                path:'bar',
                element:<Bar/>,
            },
            {
                path:'pie',
                element:<Pie/>,
            },
            {
                path:'line',
                element:<Line/>,
            },
            {
                path:'product',
                element:<Product/>,
            },
            {
                path:'role',
                element:<Role/>,
            },
            {
                path:'user',
                element:<User/>,
            },
            {
                path:'',
                element:<Navigate to='home'/>
            }
        ]
    },
    {
        path:'/',
        element:<Navigate to='/login'/>
    }
]

export default routes