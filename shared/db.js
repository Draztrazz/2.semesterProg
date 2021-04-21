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

function insert(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [users].[user] (username, password, admin, email, firstname, lastname, gender, age, bio) VALUES (@username, @password, @admin, @email, @firstname, @lastname, @gender, @age, @bio)`
        const request = new Request(sql, (err) => {
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('username', TYPES.VarChar, payload.username)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('admin', TYPES.Bit, payload.admin)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('firstname', TYPES.VarChar, payload.firstname)
        request.addParameter('lastname', TYPES.VarChar, payload.lastname)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('age', TYPES.Int, payload.age)
        request.addParameter('bio', TYPES.VarChar, payload.bio)

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
    return payload
}
module.exports.insert = insert;

function select(username, password){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from users.[user] WHERE password = @password AND username = @username'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('username', TYPES.VarChar, username)   
        request.addParameter('password', TYPES.VarChar, password)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.select = select;
