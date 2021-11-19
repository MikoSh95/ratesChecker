import {Worker_justjointit} from './workers/worker_justjointit.js';
import {OfferModel} from './offerModel.js';
import mongoose from 'mongoose';

class FetchOffers {
    static async fetch() {
        await mongoose.connect('mongodb://root:example@localhost:27017', {user: 'root', pass: 'example'});

        const jji = new Worker_justjointit();
        const result = [
            ...(await jji.fetch()),
        ];

        return result;
    }
}

new Promise(async (resolve) => {
        let offers = await FetchOffers.fetch();
        const count = offers.length;
        let lastPosition = 0;
        let i = 0;
        console.log(`${count} offers found`);
        for (const offer of offers) {
            const currentPosition = (++i / count) * 100;
            if (currentPosition > lastPosition + 10) {
                lastPosition = Math.floor(currentPosition);
                console.log(`${Math.floor(currentPosition)}% done`);
            }
            await OfferModel.updateOne({offer_url: offer.offer_url}, offer, {upsert: true});
        }
        console.log(`100% done`);
        resolve();
    }
).then(() => {
    console.log('Offers updated');
    process.exit();
})