const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
//Convert data into json format
app.use(express.json());

app.use(express.urlencoded(extended= false))

//Use EJS as the view Engine
app.set('view engine', 'ejs');
//Static File
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

//Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //Check if user already exist in the database
    const existingUser = await collection.findOne({name: data.name});

    if(existingUser) {
        res.send("User already exists, Please choose a different Username.")
    }
    else {
        //Hash the password using bcrypt
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)
        
        //Replace the hashed password with the original Password
        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
})

//Login User
app.post("/login",async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            req.send("User not Found")
        }

        //comapre the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render("home")
        }
        else {
            req.send("Wrong Password")
        }
    }
    catch {
        res.send("Wrong Details")
    }
})

const port = 5000;
app.listen(port, ()=>  {
    console.log('Server running on Port: $(port)');
})