const express = require("express");
const { connectDB, sequelize } = require("./db/db.js");
const { router: UserRouter } = require("./routers/users.router");
const { handleAllErrors } = require("./middlerwares/handleAllErrors");
const { User } = require("./db/models/users.model.js");
const { Product } = require("./db/models/products.model.js");
const { Cart } = require("./db/models/carts.model.js");
const { router: ProductRouter } = require("./routers/products.router");
const { router: AuthRouter } = require("./routers/auth.router");
const { router: CartRouter } = require("./routers/carts.router");
const { Order } = require("./db/models/Order.model.js");
const { OrderProducts } = require("./db/models/OrderProducts.model.js");
const { router: OrderRouter } = require("./routers/orders.router");


(async () => {
  await connectDB();

  //seller-products
  User.hasMany(Product, { foreignKey: "sellerId" });
  Product.belongsTo(User, {
    as: "seller",
    foreignKey: "sellerId",
  });

  //user-carts
  User.belongsToMany(Product, {
    through: Cart,
    foreignKey: "userId",
    as: "cartItems",
  });
  Product.belongsToMany(User, {
    through: Cart,
    foreignKey: "productId",
    as: "buyers",
  });

  //user-orders
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User, { foreignKey: "userId" });

  //order-products
  Product.belongsToMany(Order, { through: OrderProducts ,targetKey:'id',foreignKey:'productId'});
  Order.belongsToMany(Product, { through: OrderProducts ,targetKey:'id',foreignKey:'orderId'});

  // await sequelize.sync();

})();



const app = express();

app.use(express.json());

app.use("/", AuthRouter);
app.use("/users", UserRouter);
app.use("/products", ProductRouter);
app.use("/carts", CartRouter);
app.use("/orders", OrderRouter);

app.use(handleAllErrors);

app.listen(8000, () => {
  console.log("App running on 8000.");
});

console.log("END");