const rabbitmq = require(__base + 'app/lib/rabbitmq');

const router = server => {
    server.get('/ping', (req, res) => res.send(200, 'pong'));

    server.get('/api/Contrato', (req, res) => {
        if(req.query) {
            let resObj = {
                'dados': {
                    'contratos': [
                        {
                            'codContrato': 123456789
                        }
                    ]
                }
            }
            res.send(200, JSON.stringify(resObj));
        } else {
            res.send(500, 'NO IDENTIFIER');
        }
    });

    server.post('/api/Ocorrencia', (req, res) => {
       if(req.body.dados && req.body.dados.contrato.codContrato && req.body.dados.texto) {
           let resObj = {
               'cod': 0,
               'criticas': null
           }

           res.send(200, JSON.stringify(resObj));
       } else {
           res.send(500, 'REQUEST FAIL');
       }
    });

    server.get('/import', async (req, res) => {
        await rabbitmq.assertQueue('pointer-sms-import');
        rabbitmq.sendMessage('pointer-sms-import', JSON.stringify({ smsmailing_id: 273, queue: 'pointer-sms-import' }));
        res.send(200, 'ok')
    });
}

module.exports = router;