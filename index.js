/*
===========================================
; Title: index.js
; Author: Professor Krasso
; Date: 01 25 2023
; Modified by: Patrick Cuauro
; Description: NPM dependencies work.
===========================================
*/
//Imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const customer = require("./models/customer");

const app = express();
//this line contains the link to the database using the username and password
const CONN = "mongodb+srv://web340_admin:aslanwebdev@bellevueuniversity.5jww2it.mongodb.net/test";



// 1.- insert the new installed module express-ejs-layouts by clicking npm install express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

//the next line defines the port as 3000
const PORT = process.env.PORT || 3000;
// const port = process.env.port || 3000;

// const port = 3000;

//the next lines were added to verify the connection to the database in mongodb was successful
mongoose.connect(CONN).then(() =>{
    console.log("Connection to MongoDB database was successful\n If you see this message you were able to connect to your MongoDB Atlas cluster");
}).catch(err => {
    console.log("MongoDB Error: " + err.message);
});

//Static files
//This lines configure the entry point to the folder to 
app.use(express.static("public"));
app.use("/styles/css",express.static(__dirname + "/public/styles/css"));
// app.use(".",express.static(__dirname + "public"));
// app.use("/images",express.static(__dirname + "images"));

//Set views
// 2.- Set template engine
app.use(expressLayouts);

//5.- renamed layout.ejs to basic-template.ejs and moved to the folder layouts
app.set("layout","./layouts/basic-template")
// 4.- commented this. app.set("views","./views");
app.set("view engine","ejs");

app.get("", (req, res)=> {
    res.render("index");});
    // 3.- modified this: to the above example res.render("index", { text: "Patrick is testing this landing page"})});

app.get("/grooming", (req, res)=> {
    res.render("grooming", { text: "This is the Grooming page"})});
    
app.get("/appointment", (req, res)=> {
    res.render("appointment", { text: "Schedule your Appointment now!"})});

app.get("/boarding", (req, res)=> {
    res.render("boarding", { text: "It will be treated like a King/Queen here!"})});

app.get("/customer", (req, res)=> {
    res.render("customer", { text: "List of customers"})});

app.get("/training", (req, res)=> {
    res.render("training", { text: "It best serves the treat"})});

app.get("/registration", (req, res)=> {
     res.render("registration", { text: "Become part of the family"})});

app.get("/registration-create", (req, res) => {
        res.render("customer-create",
         {
            title: "Customer Form",
            pageTitle: "Register New User"
        });
    });
    
    app.post('/customers', (req, res, next) => {
        console.log(req.body);
        console.log(req.body.userName);
        const newCustomer = new Customers({
            name: req.body.userName
        });
    
        console.log(newCustomer);
    
        Fruit.create(newFruit, function(err, fruit) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                res.render('index', {
                    title: 'FMS: Landing'
                })
            }
        })
    })
    
    // Listen on Port 3000
//the next line was included to display the port listening for the app
    app.listen(PORT, () => {
        console.log('Application started and listening on PORT: ' + PORT);
    
        console.log('\n  Press Ctrl+C to stop the server...');});
// app.listen( PORT,()=> console.info(`Listening on port ${PORT}`));