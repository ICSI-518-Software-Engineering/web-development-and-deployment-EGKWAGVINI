const ProductController = require("../controller/product.controller");

const ProductRouter=require("express").Router();


ProductRouter.get("/getProducts", ProductController.getProducts);
ProductRouter.post("/addProduct", ProductController.addProduct);
ProductRouter.put("/updateProduct/:id", ProductController.updateProduct);
ProductRouter.delete("/deleteProduct/:id", ProductController.deleteProduct);



module.exports=ProductRouter;