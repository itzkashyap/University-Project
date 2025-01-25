import About from "../containers/about/About";
import Department from "../containers/admin/department/Department";
import Product from "../containers/admin/product/Product";
import University from "../containers/admin/unversity/University";
import Contact from "../containers/contact/Contact";
import Login from "../containers/login/Login";
import Register from "../containers/register/Register";
import Support from "../containers/support/Support";
import UserDepartment from "../containers/user/department/UserDepartment";
import UserHome from "../containers/user/home/UserHome";



import UserProduct from "../containers/user/product/UserProduct";
import ProductDetail from "../containers/user/productDetail/ProductDetail";

const  ROUTES={
    about:{
        name:"/about",
        component:<About/>,
    },         
    contact:{
        name:"/contact",
        component:<Contact/>,
    },
    support:{
        name:"/support",
        component:<Support/>,
    },
    register:{
        name:"/register",
        component:<Register/>,
    },
    login:{
        name:"/login",
        component:<Login/>,
    },
    universityAdmin:{
        name:"/universityadmin",
        component:<University/>,
    },
    departmentAdmin:{
        name:"/departmentAdmin",
        component:<Department/>,
    },
    productAdmin:{
        name:"/productAdmin",
        component:<Product/>,
    },
    userhome:{
        name:"/",
        component:<UserHome/>,
    },
    departmentUser:{
        name:"/departmentUser",
        component:<UserDepartment/>,
    },
    productUser:{
        name:"/productUser",
        component:<UserProduct/>,
    },
    productDetail:{
        name:"/productDetail",
        component:<ProductDetail/>,
    },

};
export default ROUTES;