import mongoose from "mongoose"
const UniversitySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
},
{timestamps:true}
);
const UniversityModel=mongoose.model('university',UniversitySchema);

export default UniversityModel;
