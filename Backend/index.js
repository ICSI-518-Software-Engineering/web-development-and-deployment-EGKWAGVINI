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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Create new user object
    const newUser = new User({ username, email, password });
    await newUser.save();
    
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if user exists
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


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