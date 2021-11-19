import mongoose from 'mongoose';

export const offerSchema = new mongoose.Schema({
    title: {type: String, required: true},
    company_name: {type: String, required: true},
    experience_level: {type: String, required: false},
    published_at: {type: Date, required: true},
    offer_url: {type: String, required: true},
    city: {type: String, required: true},

    b2b_from: {type: Number, required: false},
    b2b_to: {type: Number, required: false},
    permanent_from: {type: Number, required: false},
    permanent_to: {type: Number, required: false},
    mandate_contract_from: {type: Number, required: false},
    mandate_contract_to: {type: Number, required: false},

    currency: {type: String, required: false},
    skills: {type: [String], required: true},
    leading_technology: {type: String, required: true},
});

export const OfferModel = mongoose.model('Offer', offerSchema, 'offers');