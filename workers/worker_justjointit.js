const axios = require('axios');
const offerParser = require('./offer_parser');

class Worker_justjointit {

    #endpoint = 'https://justjoin.it/api/offers';

    async fetch() {
        const response = await axios.get(this.#endpoint);
        return response.data.map(x => {
            const b2b = x.employment_types.find(x => x.type === 'b2b');
            const permanent = x.employment_types.find(x => x.type === 'permanent');
            const mandate_contract = x.employment_types.find(x => x.type === 'mandate_contract');
            const currency = b2b?.salary?.currency || permanent?.salary?.currency;

            return offerParser(
                x.title,
                x.city,
                x.company_name,
                x.marker_icon,
                x.experience_level,
                x.published_at,
                `https://justjoin.it/offers/${x.id}`,
                b2b?.salary?.from,
                b2b?.salary?.to,
                permanent?.salary?.from,
                permanent?.salary?.to,
                mandate_contract?.salary?.from,
                mandate_contract?.salary?.to,
                currency,
                x.skills.map(x => x.name),
            );
        })
    }
}

module.exports = Worker_justjointit;