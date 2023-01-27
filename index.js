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
const port = 3000;

//Static files
//This lines configure the entry point to the folder to 
app.use(express.static("public"));
app.use("/styles/css",express.static(__dirname + "/public/styles/css"));
// app.use(".",express.static(__dirname + "public"));
// app.use("/images",express.static(__dirname + "images"));

//Set views
app.set("views","./views")
app.set("view engine","ejs")

app.get("", (req, res)=> {
    res.render("index", { text: "Patrick is testing this landing page"})});

app.get("/grooming", (req, res)=> {
    res.render("grooming", { text: "This is the Grooming page"})});
    

    // Listen on Port 3000
app.listen( port,()=> console.info(`Listening on port ${port}`))