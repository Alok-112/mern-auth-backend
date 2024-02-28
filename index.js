const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/', require('./routes/authRoutes'))


app.use(cors({
    origin: ['https://mern-auth-temp.vercel.app'], // you can set multiple origins
    credentials: true,
}));



const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on  port ${port}`))

