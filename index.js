const express = require("express");
const route = require("./src/routes/route")
const connectDb = require("./src/config/db")
const cors = require('cors');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const authController = require("./src/controller/authController")


const app = express();
const PORT = 8000 || process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");


connectDb();

app.get('/', (req, res)=>{
    res.render("index");
})

app.post('/', authController.signUp);

app.use("/user", route);

app.listen(PORT, ()=>{
    console.log(`You are listening the port ${PORT}`);
})