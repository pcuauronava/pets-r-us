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
 
const appointmentSchema = new Schema({
    // don't forget String is spelled with Capital S
    userName: { type: String, required:true, unique: true },
    firstName: { type: String, required:true, unique: true },
    lastName: { type: String, required:true, unique: true  },
    email: { type: String, required:true, unique: true  },
    service: { type: String, required:true, unique: true  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);