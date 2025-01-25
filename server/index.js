import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { CreateUniversity, DeleteUniversity,GetUniversity,UpdateUniversity } from "./controllers/University.js";
import { CreateDepartment, DeleteDepartment, GetDepartmentByUniversity, UpdateDepartment } from "./controllers/Department.js";
import { CreateProduct, DeleteProduct,  GetProductByDepartmentId, GetProductDetails, UpdateProduct, UpdateProductQty } from "./controllers/Product.js";
import { Login, Register } from "./controllers/User.js";
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

//university module

const StorageUniv=multer.diskStorage({
    destination:"uploadUniv/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadUniv=multer({
    storage:StorageUniv,
});

app.post("/university",uploadUniv.single("image"),CreateUniversity);
app.put("/university",uploadUniv.single("image"),UpdateUniversity);
app.delete("/university",DeleteUniversity);
app.get("/university",GetUniversity);


//Department module

const StorageDep=multer.diskStorage({
    destination:"uploadDep/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadDep=multer({
    storage:StorageDep,
});

app.post("/department",uploadDep.single("image"),CreateDepartment);
app.put("/department",uploadDep.single("image"),UpdateDepartment);
app.delete("/department",DeleteDepartment);
app.get("/department",GetDepartmentByUniversity);


//Product module

const StoragePrd=multer.diskStorage({
    destination:"uploadPrd/",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    },
});
const uploadPrd=multer({
    storage:StoragePrd,
});

app.post("/product",uploadPrd.array("images"),CreateProduct);
app.put("/product",uploadPrd.array("images"),UpdateProduct);
app.delete("/product",DeleteProduct);
app.get("/product",GetProductByDepartmentId);
app.get("/productDetails",GetProductDetails);
app.put("/productqty",UpdateProductQty);

//user Module
app.post("/user",Register);
app.post("/login",Login);


//Image Access

app.use(express.static("uploadUniv/"));
app.use(express.static("uploadDep/"));
app.use(express.static("uploadPrd/"));



//url--http:127.0.0.1:8081/university

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('database connected');
    app.listen(process.env.PORT,()=>{
        console.log('server running at port:'+process.env.PORT);
    });   
}).catch(()=>{
    console.log('database connection error');
})