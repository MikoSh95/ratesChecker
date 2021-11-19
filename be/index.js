import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose.connect('mongodb://root:example@localhost:27017', {user: 'root', pass: 'example'});

const Offer = mongoose.model('Offer', {name: String});

app.get('/offers', (req, res) => {
    Offer.find().then(offers => {
        res.json(offers);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})