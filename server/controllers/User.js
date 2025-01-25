import UserModel from "../models/User.js"

export const Register=async(req,res)=>{
    try {
        let userInDb=await UserModel.findOne({
            email:req.body.email
        });
        if(userInDb){
            res.status(404).send({message:"user already exist"});
            return;
        }
        let userData=await UserModel.create({
            ...req.body,
            profilePic:req?.file?.filename,
        });
        if(userData)res.status(201).send({message:"User Created"});
        else res.status(404).send({message:"unable to create user"});
    } catch (error) {
        console.log("Fail to submit Data!!!");
    }
};

export const Login=async(req,res)=>{
    try{
        let userInDb=await UserModel.findOne({
            email:req.body.email,
            password:req.body.password
        });
        if(userInDb)
            res.status(200).send({id:userInDb._id,role:userInDb.role});
           else
            res.status(404).send({message:"wrong user/pwd"});
        
        }catch(error){
            console.log("error?.message");
}
};