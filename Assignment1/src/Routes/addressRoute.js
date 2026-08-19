const express = require("express");
const { addressValidationSchema } = require("../Middlewares/validationSchema");
const createAddress = require("../Controllers/address");
const addressModel = require("../Models/addressModel");
const validation = require("../Middlewares/checkValidation");
const checkToken = require("../Middlewares/checkToken");

const router = express.Router();

router.post(
  "/createAddress",
  checkToken,
  validation(addressValidationSchema),
  createAddress,
);

router.get("/addressNearMe", async (req, res) => {
  const { longitude, latitude, radius } = req.query;

  const lng = parseFloat(longitude);
  const lat = parseFloat(latitude);
  const dist = parseFloat(radius);

  if (Number.isNaN(lng) || Number.isNaN(lat) || Number.isNaN(dist)) {
    return res.status(400).json({
      error: "longitude, latitude, and radius must be valid numbers",
    });
  }

  try {
    const addressData = await addressModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: dist,
        },
      },
    });
    return res.json({ addressData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/getAddress/:id", async (req, res) => {
  const street = req.query.street;
  const id = req.params.id;
  try {
    const userAddress = await addressModel.find({
      user: id,
      street,
    });

    return res.json({ address: userAddress });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
