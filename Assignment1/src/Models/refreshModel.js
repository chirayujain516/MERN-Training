const mongoose = require("mongoose");

const refreshSchema = mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, strict: true },
);

const refreshModel = mongoose.Model("refreshToken", refreshSchema);
module.exports = refreshModel;
