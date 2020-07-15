const restify = require('restify');
const server = restify.createServer();
const restifyCors = require('restify-cors-middleware');
const router = require(__base + 'app/server/router');
const cors = restifyCors({
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});

server.use((req, res, next) => {
    res.setHeader('content-type', 'text/html');
    next();
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.queryParser({
    mapParams: true
}));

server.use(restify.plugins.bodyParser({
    mapParams:true
}));

server.server.setTimeout(60000 * 60);
router(server);

server.listen(9876, () => console.log('app listening at ' + 9876));

module.exports = server;