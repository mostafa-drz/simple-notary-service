const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key, value) {
    return new Promise((resolve, reject) => {
        db.put(key, value, function(err) {
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

// Get data from levelDB with key
function getLevelDBData(key) {
    return new Promise((resolve, reject) => {
        db.get(key, function(err, value) {
            if (err) {
                return reject({
                    error: {
                        message: 'Not Found!',
                        main: err
                    }
                })
            }
            return resolve(value);
        })
    });

}

// Add data to levelDB with value
function addDataToLevelDB(value) {
    return new Promise((resolve, reject) => {
        let i = 0;
        db.createReadStream().on('data', function(data) {
            i++;
        }).on('error', function(err) {
            return reject({
                error: {
                    message: 'Unable to read data stream!',
                    main: err
                }
            })
        }).on('close', function() {
            console.log('Block #' + i);
            return resolve(addLevelDBData(i, value));
        });
    });

}

function getNumberOfRecordsInDB() {
    return new Promise((resolve, reject) => {
        let i = 0;
        db.createReadStream().on("data", function(data) {
            i++;
        }).on("error", function(err) {
            return reject({
                error: {
                    message: 'Could not get the number of records',
                    main: err
                }
            })
        }).on("close", function() {
            return resolve(i);
        });
    });

}

module.exports = {
    getLevelDBData,
    addDataToLevelDB,
    getNumberOfRecordsInDB
}