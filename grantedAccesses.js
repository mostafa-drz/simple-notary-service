const level = require('level');
const grantedAccesses = './granted-access';
const db = level(grantedAccesses);

function addToGrantedAccesses(address, value) {
    return new Promise((resolve, reject) => {
        db.put(address, JSON.stringify(value), function(err) {
            if (err) {
                return reject({
                    error: {
                        message: 'adding the granted access failed',
                        main: err
                    }
                });
            } else {
                return resolve(value);
            }
        })
    });
}

function getFromGrantedAccess(address) {
    return new Promise((resolve, reject) => {
        db.get(address, function(err, value) {
            if (err) {
                return reject({
                    error: {
                        message: 'no granted access found!',
                        main: err
                    }
                })
            }
            return resolve(JSON.parse(value));
        })
    });
}

function removeFromGrantedAccess(address) {
    db.del(address);
}
module.exports = {
    addToGrantedAccesses,
    getFromGrantedAccess,
    removeFromGrantedAccess
}