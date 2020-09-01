global.__base = __dirname + '/';
require(__base + 'app/server/server')
// require('dotenv').config();

const rabbitmq = require(__base + 'app/lib/rabbitmq');


(async () => {
    try {
        await rabbitmq.connect();
    } catch(e) {
        throw e;
    }
})()