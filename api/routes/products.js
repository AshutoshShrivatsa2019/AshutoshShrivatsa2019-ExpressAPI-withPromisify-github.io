const express=require("express");
const readWriteObj=require("../../read-write-obj");
const router=express.Router();

var products=[];
var prod=require("../../startup");
prod.then((response)=>{
    products=response;
})
//var products=[];

console.log(products);

router.get("/",async(req,res,next)=>{
    // res.status(200).json({
    //     message:"Handling GET requests at /api/products"
    // });

    // let productsList=readWriteObj(null,0);
    // productsList.then((response)=>{
    //     res.status(200).json(response);
    // })

    let productsList=await readWriteObj(null,0);
        res.status(200).json(productsList);


    //res.status(200).json(productsList);
});

router.get("/:id",async(req,res,next)=>{
    // res.status(200).json({
    //     message:`Handling GET requests at /api/products where param is ${req.params.id}`
    // })

    let productsList=await readWriteObj(null,0);

    let product=productsList.find(p=> p.id===parseInt(req.params.id));
    
    if(!product) //404
    res.status(404).json(
        {
            message:`Product not found at id:${req.params.id}!!!`  
        });
    else
    res.status(200).json(product);


    // let product=productsList.find(p=> p.id===parseInt(req.params.id));
    
    // if(!product) //404
    // res.status(404).json(
    //     {
    //         message:`Product not found at id:${req.params.id}!!!`  
    //     });
    // else
    // res.status(200).json(product);
})

router.post("/",(req,res,next)=>{
    // res.status(200).json({
    //     message:"Handling POST requests at /api/products"
    // })

    // if(typeof products == "undefined" || products == null && products.length == null
    // || products.length <= 0)
    // {
    //     products=readWriteObj(null,0);
    // }
    
    let prodList={};
    prodList=req.body;
    prodList.id=products.length+1;

    products.push(prodList);

        
    // readWriteObj(products,1);
    // res.status(201).json(prodList);

    readWriteObj(products,1)
    .then((response)=>{
        res.status(201).json(prodList);
    })

})

router.put("/:id",(req,res,next)=>{
    // res.status(200).json({
    //     message:`Handling PUT requests at /api/products where param is ${req.params.id}`
    // })
    
    // if(typeof products == "undefined" || products == null && products.length == null
    // || products.length <= 0)
    // {
    //     products=readWriteObj(null,0);
    // }
    let product=products.find(p=>p.id===parseInt(req.params.id));

    if(!product) //404
    res.status(404).json(
        {
            message:`Product not found at id:${req.params.id}!!!`  
        });

    let index=products.indexOf(product);
    product=req.body;
    product.id=parseInt(req.params.id);
    products.splice(index,1,product);
    // readWriteObj(products,1);
    //  res.status(202).json(product);

     readWriteObj(products,1)
     .then((response)=>{
         res.status(201).json(product);
     })
})


router.patch("/:id",(req,res,next)=>{
    // res.status(200).json({
    //     message:`Handling PUT requests at /api/products where param is ${req.params.id}`
    // })
    
    // if(typeof products == "undefined" || products == null && products.length == null
    // || products.length <= 0)
    // {
    //     products=readWriteObj(null,0);
    // }
    let product=products.find(p=>p.id===parseInt(req.params.id));

    if(!product) //404
    res.status(404).json(
        {
            message:`Product not found at id:${req.params.id}!!!`  
        });

    let index=products.indexOf(product);
    product=req.body;
    product.id=parseInt(req.params.id);
    products.splice(index,1,product);

    // readWriteObj(products,1);
    //  res.status(202).json(product);

    readWriteObj(products,1)
    .then((response)=>{
        res.status(202).json(product);
    })

})

router.delete("/:id",(req,res,next)=>{
    // res.status(200).json({
    //     message:`Handling DELETE requests at /api/products where param is ${req.params.id}`
    // })

    // if(typeof products == "undefined" || products == null && products.length == null
    // || products.length <= 0)
    // {
    //     products=readWriteObj(null,0);
    // }
    let product=products.find(p=>p.id===parseInt(req.params.id));
    if(!product) //404
    res.status(404).json(
        {
            message:`Product not found at id:${req.params.id}!!!`  
        });

    let index=products.indexOf(product);
        products.splice(index,1);
        //console.log(products);
//    products=products.filter((p,index)=> index!==products.indexOf(product));
        // readWriteObj(products,1);
        // res.status(203).json(product);

        readWriteObj(products,1)
        .then((response)=>{
            res.status(203).json(product);
        })
})


module.exports=router;