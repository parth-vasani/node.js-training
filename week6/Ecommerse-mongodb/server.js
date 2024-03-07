
const express=require('express');
const { connectDB } = require('./db/db');
const { router:UserRouter } = require('./routers/users.router');
const { handleAllErrors } = require('./middlerwares/handleAllErrors');
const { router:ProductRouter } = require('./routers/products.router');
const { router:AuthRouter } = require('./routers/auth.router');
const { router:CartRouter } = require('./routers/carts.router');
const { router:OrderRouter } = require('./routers/orders.router');

connectDB();

const app=express();

app.use(express.json());

app.use('/',AuthRouter);
app.use('/users',UserRouter);
app.use('/products',ProductRouter);
app.use('/carts',CartRouter);
app.use('/orders',OrderRouter)

app.use(handleAllErrors);

app.listen(8000,()=>{
    console.log("App running on 8000.");
})