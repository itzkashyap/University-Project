import UniversityModel from "../models/university.js";

export const CreateUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.create({
      name: req.body.name,
      image: req?.file?.filename,
    });
    if (univData) res.status(201).send({ message: "University Created" });
    else res.status(404).send({ message: "Unable to Create University" });
  } catch (error) {
    console.log("fail to submit data !!");
  }
};

export const UpdateUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        name: req.body.name,
        image: req?.file?.filename,
      }
    );
    if (univData) res.status(200).send({ message: "University Updated" });
    else res.status(404).send({ message: "Unable to Update University" });
  } catch (error) {
    console.log("fail to submit data !!");
  }
};

export const DeleteUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.deleteOne({
      _id: req.body._id,
    });
    if (univData) res.status(200).send({ message: "University Deleted" });
    else res.status(404).send({ message: "Unable to Delete University" });
  } catch (error) {
    console.log("fail to submit data !!");
  }
};

export const GetUniversity=async(req, res)=>{
  try {
    const univData=await UniversityModel.find();
    res.status(200).send({univData});
  } catch (error) {
    console.log("Fail to submit Data");
  }
};