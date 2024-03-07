const { default: mongoose } = require("mongoose");
const { Product } = require("./products.model");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already used."],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Buyer", "Seller"],
    required: true,
  },
  cart: [{
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    count:{
      type:Number,
      default:1,
    }
  }
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
