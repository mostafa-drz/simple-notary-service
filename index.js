const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./simpleChain');
const bitcoin = require('bitcoinjs-lib');
const bitcoinMessage = require('bitcoinjs-message');
const {
    addToMemPool,
    getFromMempool,
    removeFromPool
} = require('./memPool');
const {
    addToGrantedAccesses,
    getFromGrantedAccess,
    removeFromGrantedAccess
} = require('./grantedAccesses');
const VALIDATION_WINDOW = 300;
const chain = new Blockchain();
app.use(bodyParser.json());
app.post('/block', (req, res) => {
    if (!req.body || !req.body.body || req.body.body.trim() === 0) {
        return res.status(400).send({
            error: {
                message: "The body can not be empty"
            }
        });
    }
    try {
        chain.addBlock(req.body).then((value) => {
            return res.status(200).send(value);
        }).catch((err) => {
            return res.status(500).send(err);
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/block/:height', (req, res) => {
    if (req.params.height < 0) {
        return res.status(400).send({
            error: {
                message: 'invalid block number'
            }
        })
    }
    try {
        chain.getBlock(req.params.height).then((value) => {
            res.status(200).send(value);
        }).catch((error) => {
            return res.status(400).send(error);
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/validate-a-block/:height', (req, res) => {
    if (req.params.height < 0 || isNaN(req.params.height) || !Number.isInteger(parseInt(req.params.height, 10))) {
        return res.status(400).send({
            error: {
                message: 'invalid block number'
            }
        })
    }
    try {
        chain.validateBlock(req.params.height).then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            return res.status(400).send(error);
        })
    } catch (error) {
        console.log(error);
    }
});

app.get('/validate-the-chain', (req, res) => {
    try {
        chain.validateChain().then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(400).send(error);
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/block-height', (req, res) => {
    chain.getBlockHeight().then((height) => {
        res.status(200).send({
            height
        });
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.post('/requestValidation', (req, res) => {
    if (!req.body || !req.body.address) {
        return res.status(400).send({
            error: {
                message: 'The walltet address is required for validation'
            }
        });
    }
    const address = req.body.address;
    const requestTimeStamp = new Date().getTime();
    const LABEL = 'starRegistery';
    const validationRequest = {
        address,
        requestTimeStamp,
        message: `${address}:${requestTimeStamp}:${LABEL}`,
        validationWindow: VALIDATION_WINDOW
    };
    addToMemPool(address, validationRequest).then(() => {
        res.status(200).send(validationRequest);
    }).catch((error) => {
        res.status(500).send(error);
    })


});

app.post('/message-signature/validate', async(req, res) => {
    if (!req.body || !req.body.address || !req.body.signature) {
        return res.status(400).send({
            error: {
                message: 'The address and signature are required for validation'
            }
        });
    }
    const {
        address,
        signature
    } = req.body;
    try {
        const validationRequest = await getFromMempool(address);
        const validationRemainingTime = (new Date().getTime() - validationRequest.requestTimeStamp) / 1000;
        if (validationRemainingTime > 300) {
            removeFromPool(address);
            return res.status(400).send({
                error: {
                    message: 'Validation request timed out'
                }
            });
        } else {
            const isValid = bitcoinMessage.verify(validationRequest.message, address, signature);
            // const grantedAccess = {
            //     registerStart: true,
            //     status: Object.assign({
            //         messageSignature: 'valid'
            //     }, validationRequest, {
            //         validationWindow: VALIDATION_WINDOW - validationRemainingTime
            //     })
            // }
            // await addToGrantedAccesses(address, grantedAccess);
            res.status(200).send({
                valid: isValid
            });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
// app.use(express.static('client/build'));

// const path = require('path');
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve('client', 'build', 'index.html'));
// });
app.listen(process.env.PORT || 8000, (error) => {
    if (error) {
        console.log('Somethign went wrong when tried to start the server');
    } else {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    }
})