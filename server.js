const express = require('express')
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require('dotenv')
const router = require('./src/router')
const connectDB = require('./src/database')
dotenv.config()

const port = process.env.PORT

const app = express()
app.use(express.json());
app.use(router)
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));

app.get('/set-cookie', (req, res) => {
    res.setHeader('Set-Cookie', 'sessionId=123456');
    res.send('Cookie set successfully');
  });

  const generateSessionId = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  console.log(generateSessionId())
  
  app.use((req, res, next) => {
    if (!req.cookies.sessionId) {
      res.cookie('sessionId', generateSessionId(), { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    }
    next();
  });

  

 app.listen(port , ()=>{
    console.log('Server Is Running')
})


connectDB().then((con)=>{
    console.log('Connected To DataBase')
})
