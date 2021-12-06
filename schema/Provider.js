// Ajouter fournisseur 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProviderSchema = mongoose.Schema({
    name : String, 
    location: String,
    description: String,
    phone: String,
    logo: String,
    social_fb: String,
    // Add ( Email & tax registration number)
    email: String,
    tax_registration_number: String,
    contact_name: String,

    website:  String,
    facebook:  String,
    instagram:  String,

    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Providers', ProviderSchema);


