import AddressModel from "../models/AllAddress.js";

export const saveAddress = async (req, res) => {
  
    try {
      const newAddress = new AddressModel({
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: req.body.country,
      });
      await newAddress.save();
      res.status(201).json(newAddress); 
    } catch (error) {
      res.status(500).json({ message: 'Error saving address', error });
    }
  };
  

    
    export const getAddresses = async (req, res) => {
    try {
      const addresses = await AddressModel.find();
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching addresses', error });
    }
  };
  