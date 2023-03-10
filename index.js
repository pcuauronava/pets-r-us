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
const router = express.Router();
const fs = require("fs");

const Customer = require("./models/customer.js");
const Appointment = require("./models/appointments.js");
const app = express();
//this line contains the link to the database using the username and password
// const CONN = "mongodb+srv://web340_admin:aslan123@bellevueuniversity.5jww2it.mongodb.net/web340DB";
const CONN = "mongodb+srv://web340_admin:aslan123@bellevueuniversity.5jww2it.mongodb.net/web340DB?retryWrites=true&w=majority";


// 1.- insert the new installed module express-ejs-layouts by clicking npm install express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");
const appointments = require("./models/appointments.js");


//the next line defines the port as 3000
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));


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

// app.get("/appointment", (req, res) => {
//     res.render("appointment")
//     });
    
app.get("/appointments", ( req, res) => {
    //this line uses the filesystem to read the information in the json file in the data folder
    let jsonFile = fs.readFileSync('./public/data/services.json');
    //this variable is using this information to be used later in the form
    let services = JSON.parse(jsonFile);
    console.log(services);
    //this line renders the page passing the information from the services
    //previously read from the JSON extension file
    res.render("appointment", {
        text: "Make an appointment today",
        services: services});
    });
    //this line is going to pass all the information retrieved from the form to the database
    app.post('/appointment', (req, res, next) => {
        //this line makes use of the appointment model of the mongoose module
        const newAppointment = new Appointment({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            service: req.body.service
        });
        console.log(newAppointment);
        //this verifies if theres is an error and returns it
        Appointment.create(newAppointment, function (err, appointment) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                //if there's no error found it returns the index page
                res.render('index');
            }
        });
    });
app.get("/my-appointments",(req, res)=>{
    res.render("my-appointments", { text: "Check your future appointments"})});

app.get("/api/appointments/:email", async(req,res,next)=>{
    Appointment.find({'email': req.params.email}, function(err, appointment){
        if(err){
            console.log(err);
            next(err);
        } else {
            res.json(appointment);
        }
    });
});

app.get("/boarding", (req, res)=> {
    res.render("boarding", { text: "It will be treated like a King/Queen here!"})});

app.get("/grooming", (req, res)=> {
    res.render("grooming", { text: "This is the Grooming page"})});

app.get("/customer", (req, res)=> {
    // this line provides a handler to the errors it could find
    // when we try to access the database
    // and in the case no errors are found it will render
    // the results of the retrieval of the information
    // from the documents
    Customer.find({}, function(err, customers) {
        if(err){
            console.log(err);
            next(err);
        }   else {
                res.render("customer", {
                    text: "List of Registered Users",
                customers: customers
                })
            }
        })
    });
app.get("/training", (req, res)=> {
    res.render("training", { text: "It best serves the treat"})
});

app.get("/registration", (req, res)=> {
     res.render("registration", { text: "Become part of the family"})
    });
    
app.post('/customer', (req, res, next) => {
    console.log(req.body);
    // let customerID = body.getElementById("customerName").value;
    console.log(req.body.customerName);
    // console.log(req.customerLastName);
    // console.log(req.customerPetName);
    console.log(req.body.email);
    const newCustomer = new Customer({
    customerName: req.body.customerName,
    // customerLastName: req.customerLastName,
    // customerPetName: req.customerPetName,
    email:req.body.email
    });
    // console.log(newCustomer);
    
    Customer.create(newCustomer, function(err, customer) {
        if (err) {
            console.log(err);
            next(err);
            } else {
                res.render("index");
            }
        })
    });
// Listen on Port 3000
//the next line was included to display the port listening for the app

// function getAppointment(req, res, next) {
//     try {
//         appointment = Appointments.findByEmail(req.params.email)
//         if (appointment == null) {
//             return res.status(404).json({ message: 'Cannot find Appointment' })
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message})
//     }
//     res.appointment = appointment
//     next()
// }
    app.listen(PORT, () => {
        console.log('Application started and listening on PORT: ' + PORT);
    
        console.log('\n  Press Ctrl+C to stop the server...');});