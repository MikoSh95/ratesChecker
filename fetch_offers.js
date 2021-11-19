const WorkerJji = require('./workers/worker_justjointit');

class FetchOffers {
    static async fetch() {
        const jji = new WorkerJji();
        const result = [
            ...(await jji.fetch()),
        ];

        return result;
    }
}

new Promise(async () => {
        await FetchOffers.fetch();
    }
)