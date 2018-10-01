const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./simpleChain');
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

// app.use(express.static('client/build'));

// const path = require('path');
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve('client', 'build', 'index.html'));
// });
app.listen(process.env.PORT || 8000, (error) => {
    if (error) {
        console.log('Somethign went wrong when tried to start the server');
    } else {
        console.log(`Server is running on port ${process.env.PORT || 4000}`);
    }
})