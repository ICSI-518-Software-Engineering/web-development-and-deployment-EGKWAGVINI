const Product = require("../models/product.model");
const fs=require("fs");


const ProductController={};


ProductController.addProduct=(req,res)=>{
    try{
        // req.files.images.forEach((item,index)=>{
          let image=(req.files.image)
        //let image=req.files[0].image;
        let rootpath=__dirname.split("controller")[0];
            let time=(new Date().getTime());
            let path=(rootpath)+`assets/product-images/`;
            let imagename=`${time}${image.name}`;
            
            image.mv(path+imagename,(err)=>{
                if(err)
                    console.log(err);
                else{
                    
                }
                    
            })
    
        let product=new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity:req.body.quantity,
            images:imagename
            //images: 
        });
        product.save().then((response)=>{
            res.send({status:"success", message:"Product added successfully"});
        }).catch(err=>{
            console.log(err);
            res.send({status:"error"})
        })
     
    }
    catch(e){
        console.log(e);

        res.send({status:"error"})
    }
}



ProductController.getProducts=(req, res)=>{
    try{

        Product.find().then((response)=>{
            res.send({status:"success", products:response});
        })
    }catch(e){
        console.log(e);
    }
}


ProductController.updateProduct=(req, res)=>{
    try{
        let id=req.params.id;
        let newValues=req.body;
        if(req.files?.imageInput){
            let rootpath=__dirname.split("controller")[0];
            let time=(new Date().getTime());
            let imageFile=req.files.imageInput;
            let imageName=time+imageFile.name;
            imageFile.mv((rootpath)+`assets/product-images/${imageName}`);
            newValues.image=imageName;
        }
        Product.findByIdAndUpdate(id, newValues, { new: true }).then(updatedProduct => {
            if (updatedProduct) {
            console.log('Product updated:', updatedProduct);
            res.send({status:"success", message:"Product Updated Susccessfully"});
            } else {
            console.log('Product not found.');
            }
        })

    }catch(e){
        console.log(e);
        res.send({status: "fail"})
    }
}



ProductController.deleteProduct=(req, res)=>{
    try{
        let id=req.params.id;
        Product.findByIdAndDelete(id)
  .then(deletedProduct => {
    if (deletedProduct) {

        let rootpath=__dirname.split("controller")[0];
        let path=(rootpath)+`assets/product-images/`;
        fs.unlink(path+deletedProduct.image,(err)=> {
            if(err)
            console.log(err);
        })
      console.log('Product deleted:', deletedProduct);
      res.send({status:"success", message:"Product deleted successfully"})
    } else {
        res.send({status:"error", message:"Product not found"})
    }
  })
  .catch(error => {
    console.log("error",error)
    res.send({status:"error", message:"Unable to delete product"});
  });
    }
    catch(e){
        console.log(e);
        res.send({status:"error", message:"Unable to delete product"});
    }
}








module.exports=ProductController;