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

function select(username){
    return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM [n].[n] where username = @n'
    const request = new Request(sql, (err, rowcount) => {
        if(err){
            reject(err)
            console.log(err)
        } else if(rowcount == 0) {
            reject({message: 'User does not exist'})
        }
    });
    request.addParameter('n', TYPES.VarChar, username)

    request.on('row', (columns) => {
        resolve(columns)
    });
    connection.execSql(request)})
    
}
module.exports.select = select;