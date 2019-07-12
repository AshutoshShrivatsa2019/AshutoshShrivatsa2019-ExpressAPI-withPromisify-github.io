const express=require("express");
const myapp=express();
const morgan=require("morgan");

const productsRoute=require("./api/routes/products");

const ordersRoutes=require("./api/routes/order");

myapp.use(morgan("dev"));

myapp.use(express.json());

myapp.use((req,res,next)=>{
    // res.status(200).json({
    //     message:"It works!"
    // });
    next();
//    console.log("It works!");
});

myapp.use("/api/products",productsRoute);

myapp.use("/api/orders",ordersRoutes);

myapp.use((req,res,next)=>{
    const error=new Error("Route not Found!!");
    error.status=404;
    next(error);
})

myapp.use((error,req,res,next)=>{
    res.status(error.status||999);
    res.json({
        error:{
            errmessage:error.message,
            errstatus:error.status
        }
    })
})

module.exports=myapp;