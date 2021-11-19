import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import {OfferModel} from './offerModel.js';

const app = express();
const port = 3000;

app.use(bodyParser.json({ type: 'application/*+json' }));

mongoose.connect('mongodb://root:example@localhost:27017', {user: 'root', pass: 'example'});

app.get('/offers', (req, res) => {

    const contractTypes = req?.query?.contract_types ? req?.query?.contract_types :['b2b', 'permanent', 'mandate_contract'];

    let fromQuery;
    if(req?.query?.from) {
        const fromValue = req?.query?.from;
        fromQuery = contractTypes.map(x => {
            switch (x) {
                case 'b2b':
                    return {b2b_from: {$gte: fromValue}};
                case 'permanent':
                    return {permanent_from: {$gte: fromValue}};
                case 'mandate_contract':
                    return {mandate_contract_from: {$gte: fromValue}};
                default:
                    return {};
            }
        });
    }

    let toQuery;
    if(req?.query?.to) {
        const toValue = req?.query?.to;
        toQuery = contractTypes.map(x => {
            switch (x) {
                case 'b2b':
                    return {b2b_from: {$lt: toValue}};
                case 'permanent':
                    return {permanent_from: {$lt: toValue}};
                case 'mandate_contract':
                    return {mandate_contract_from: {$lt: toValue}};
                default:
                    return {};
            }
        });
    }

    const query = {
        ...(req?.query?.cities ? {city: {$in: req?.query?.cities}} : {}),
        ...(req?.query?.companies ? {company_name: {$in: req?.query?.companies}} : {}),
        ...(fromQuery ? {$or: fromQuery} : {}),
        ...(toQuery ? {$or: toQuery} : {}),
        ...(req?.query?.skills ? {skills: {$in: req?.query?.skills}} : {}),
        ...(req?.query?.leading_technology ? {leading_technology: {$in: req?.query?.leading_technology}} : {}),
    };

    OfferModel.find(query).then(offers => {
        res.json(offers);
    })
})

app.get('/skills', async (req, res) => {
    const result = await OfferModel.aggregate([
        {$unwind: '$skills'},
        {$group: {_id: 'skills', items: {$addToSet: "$skills"}}},
    ]);
    res.json(result[0].items);
})

app.get('/leading_technology', async (req, res) => {
    const result = await OfferModel.aggregate([
        {$group: {_id: 'leading_technologies', items: {$addToSet: "$leading_technology"}}},
    ]);
    res.json(result[0].items);
})

app.get('/cities', async (req, res) => {
    const result = await OfferModel.aggregate([
        {$group: {_id: 'cities', items: {$addToSet: "$city"}}},
    ]);
    res.json(result[0].items);
})

app.get('/companies', async (req, res) => {
    const result = await OfferModel.aggregate([
        {$group: {_id: 'companies', items: {$addToSet: "$company_name"}}},
    ]);
    res.json(result[0].items);
})

app.get('/contract_types', async (req, res) => {
    res.json(['b2b', 'permanent', 'mandate_contract']);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})