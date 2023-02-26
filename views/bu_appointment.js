/*
===========================================
; Title: appointment.js
; Author: Professor Krasso
; Date: 02 23 2023
; Modified by: Patrick Cuauro
; Description: Appointment mongoose Schema file.
===========================================
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 
let appointmentSchema = new Schema({
    firstName: { type: String, required:true },
    lastName: { type: String, required:true },
    email: { type: String, required:true },
    service: { type: String, required:true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);