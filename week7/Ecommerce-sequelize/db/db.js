const { Sequelize } = require("sequelize");



let sequelize=new Sequelize('postgres://postgres:12345@localhost:5432/Ecommerce');

async function connectDB(){
  
  try{
    await sequelize.authenticate();
    console.log("Connected to DB.")

    // models.User=sequelize.define('User',userSchema);
    // models.Product=sequelize.define('Product',productSchema);
    // models.Cart=sequelize.define('Cart',cartSchema);


    // await sequelize.sync({force:true});
  }
  catch(err){
    console.log(err);
  }
  
}

// (async ()=>{
//   await connectDB();
// })();

// const { User } = require("./models/users.model");
// const { Product } = require("./models/products.model");

// User.hasMany(Product, { foreignKey: "sellerId" });
// Product.belongsTo(User, { as: "seller", foreignKey: "sellerId" });


console.log("Hello")

module.exports={connectDB,sequelize};
