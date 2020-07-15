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
}

module.exports = router;