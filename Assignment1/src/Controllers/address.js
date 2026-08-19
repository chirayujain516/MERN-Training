const addressModel = require("../Models/addressModel");
const { addressValidationSchema } = require("../Middlewares/validationSchema");

const createAddress = async (req, res) => {
  try {
    const { type, street, city, state, country, pincode, longitude, latitude } =
      req.body;

    let addressData = {
      user: req.user.id,
      type,
      street,
      city,
      state,
      country,
      pincode,
    };

    if (longitude !== undefined && latitude !== undefined) {
      addressData.location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
    }

    const newAddress = await addressModel.create(addressData);
    res
      .status(201)
      .json({ message: "Created Successfully", address: newAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createAddress;
