const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_desc: {
      type: String,
    },
    product_price: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product=mongoose.model('Product',productSchema)

module.exports={productSchema,Product}