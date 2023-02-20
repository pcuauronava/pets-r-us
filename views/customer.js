//inserted based on the example of the WEB340 repository mongoose model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let customerSchema = new Schema({
    customerId: {type: string, required: true, unique: true},
    email: {type: string, required:true, unique:true}
 });

module.exports = mongoose.model('Customer', customerSchema);

//step 3 web340_assign6.docx instructions by Krasso
//make them unique and required use the keyword required and unique and
//set the value to true


//The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, for the example above, the model Customer is for the customers collection
// in the database.
// Note: The .model() function makes a copy of schema.
//  Make sure that you've added everything you want to schema,
//  including hooks, before calling .model()!
//source: https://mongoosejs.com/docs/models.html

//