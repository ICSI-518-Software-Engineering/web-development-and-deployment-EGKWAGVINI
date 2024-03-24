const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const _dirname=path.dirname("");
const buildPath=path.join(_dirname,"../assignment1/build");
const app = express();
const cors=require("cors");
const fileUpload = require('express-fileupload');
//app.use(express.static(path.join(__dirname, 'assets')));
const ProductRouter = require("./src/router/product.router");
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors("*"));
const port = 8080
const mongoose = require("mongoose");
const mongoURI=`mongodb+srv://welkurigantalavarikaranam:pNGIdxeBTbRwrAsZ@inventory.bfpakry.mongodb.net/?retryWrites=true&w=majority&appName=Inventory`;
const sslOptions = {
  ssl: true,
  tls: true
};
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ...sslOptions
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
app.post('/addNumbers', (req, res) => {
    console.log(req.body)
    const {number1, number2}=req.body;
    if(number1!=""&& number2!="")
        res.send({result:(parseInt(number1)+parseInt(number2))})
    else
        res.send({error:"Please enter valid inputs"})
});


app.use("/products",ProductRouter);

app.use(express.static(buildPath));
console.log()
app.use("/assets",express.static(path.join(__dirname+"/src/assets/product-images/")));
// app.get("/*", function(request, response){ 
//     response.sendFile(path.join(_dirname,"../assignment1/build/index.html"), function(err){
//       console.log(err);
//     })

// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})