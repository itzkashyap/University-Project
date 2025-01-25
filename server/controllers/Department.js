import DepartmentModel from "../models/Department.js"

export const CreateDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.create({
            name:req.body.name,
            image:req?.file?.filename,
            university:req.body.universityId,
        });
        if(depData)res.status(201).send({message:"Department Created!!!"});
        else res.status(404).send({message:"unable to create Department!!"});
    } catch (error) {
        console.log("Fail to Submit data!!");
    }
};

export const UpdateDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.findByIdAndUpdate({
            _id:req.body._id},{
            name:req.body.name,
            image:req?.file?.filename,
            university:req.body.universityId,
        });
        if(depData)res.status(200).send({message:"Department Updated!!!"});
        else res.status(404).send({message:"unable to Update Department!!"});
    } catch (error) {
        console.log("Fail to Submit data!!");
    }
};

export const DeleteDepartment=async(req,res)=>{
    try {
        const depData=await DepartmentModel.deleteOne({
            _id:req.body._id,
        });
        if(depData)res.status(200).send({message:"Department Deleted!!!"});
        else res.status(404).send({message:"unable to Delete Department!!"});
    } catch (error) {
        console.log("Fail to Submit data!!");
    }
};
export const GetDepartmentByUniversity=async(req,res)=>{
    try {
        const depData=await DepartmentModel.find({
            university:req.query.id
        }).populate('university');
        // console.log(depData)
        res.status(200).send({depData});        
    } catch (e) {
       
        res.status(404).send({error:e?.message});
    }
};