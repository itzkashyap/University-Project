import mongoose from "mongoose"

const DepartmentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    university:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"university",
        require:true,
    },
},
{timestamps:true}
);
const DepartmentModel=mongoose.model('department',DepartmentSchema);

export default DepartmentModel;
