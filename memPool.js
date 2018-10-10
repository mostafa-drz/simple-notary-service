const level = require('level');
const memPool = './mempoolData';
const db = level(memPool);

function addToMemPool(address, value) {
    return new Promise((resolve, reject) => {
        db.put(address, JSON.stringify(value), function(err) {
            if (err) {
                return reject({
                    error: {
                        message: 'Block ' + key + ' submission failed',
                        main: err
                    }
                });
            } else {
                return resolve(value);
            }
        })
    });
}

function getFromMempool(address) {
    return new Promise((resolve, reject) => {
        db.get(address, function(err, value) {
            if (err) {
                return reject({
                    error: {
                        message: 'No validation request found',
                        main: err
                    }
                })
            }
            return resolve(JSON.parse(value));
        })
    });
}

function removeFromPool(address) {
    db.del(address);
}
module.exports = {
    addToMemPool,
    getFromMempool,
    removeFromPool
}