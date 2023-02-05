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
const app = express();
// 1.- insert the new installed module express-ejs-layouts by clicking npm install express-ejs-layouts
const expressLayouts = require("express-ejs-layouts");
const port = 3000;

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
    res.render("index");
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
});
    
    
    // Listen on Port 3000
app.listen( port,()=> console.info(`Listening on port ${port}`))