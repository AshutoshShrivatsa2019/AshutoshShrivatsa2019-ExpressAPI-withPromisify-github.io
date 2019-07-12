const express=require("express");
const router=express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET request for /api/orders"
    })
});

router.get("/:orderID",(req,res,next)=>{
    res.status(200).json({
        message:`Handling GET requests for /api/orders where param is ${req.params.orderID}`,
        orderID:req.params.orderID
    })
});
router.post("/",(req,res,next)=>{
    res.status(201).json({
        message:"Handling GET requests for /api/orders"
    })
});

router.delete("/:orderID",(req,res,next)=>{
    res.status(202).json({
        message:`Handling GET requests for /api/orders where param is ${req.params.orderID}`,
        orderID:req.params.orderID
    })
});

module.exports=router;