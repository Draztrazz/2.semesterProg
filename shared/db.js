const {Connection, Request, TYPES} = require('tedious');
const config = require('./config.json');

var connection = new Connection(config)

function startDB(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if(err) {
                console.log("Connection failed")
                reject(err)
                throw err;
            } else {
                console.log("Connection")
                resolve();
            }
        })
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDB = startDB;