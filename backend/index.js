const express=require('express');
const {connectDb}=require('./db/connDb');
const methodOverride = require("method-override");
const cors = require('cors');

const cookieParser=require('cookie-parser');
require('dotenv').config();
const authRoutes=require('./routes/authRoutes');
const productRoutes=require('./routes/productRoutes');
const wishlistRoutes=require('./routes/wishListRoute');



const app=express();
const port=process.env.PORT

app.use(methodOverride("_method")); 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

  const corsOptions = {
    origin: ['http://localhost:5173',], // Allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies/auth headers
};

app.use(cors(corsOptions));

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/wishlist',wishlistRoutes);


  

app.listen(port,()=>{
    console.log(`listening on ${port}`);
    connectDb();
})