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
        const sql = `INSERT INTO [users].[user] (username, password, admin, email, firstname, lastname, gender, dob, bio) VALUES (@username, @password, @admin, @email, @firstname, @lastname, @gender, @dob, @bio)`
        const request = new Request(sql, (err) => {
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('username', TYPES.VarChar, payload.username)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('admin', TYPES.Bit, 0)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('firstname', TYPES.VarChar, payload.firstname)
        request.addParameter('lastname', TYPES.VarChar, payload.lastname)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('dob', TYPES.Date, payload.dob)
        request.addParameter('bio', TYPES.VarChar, payload.bio)

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.insert = insert;


function select(username, password){
    return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM [users].[user] where username = @username AND password = @password'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
        } else if (rowCount == 0) {
            reject({message: 'User does not exist'})}
        }
    );
    request.addParameter('username', TYPES.VarChar, username)
    request.addParameter('password', TYPES.VarChar, password)

    request.on('row', (columns) => {
        resolve(columns)
    });
    connection.execSql(request)})
    
}
module.exports.select = select;

function idSelect(id){
    return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM [users].[user] where id = @id'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
        } else if (rowCount == 0) {
            reject({message: 'User does not exist'})}
        }
    );
    request.addParameter('id', TYPES.Int, id)

    request.on('row', (columns) => {
        resolve(columns)
    });
    connection.execSql(request)})
    
}
module.exports.idSelect = idSelect;

function idDelete(id){
    return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM [users].[user] where id = @id'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
        } else if (rowCount == 0) {
            reject({message: 'Cannot delete profile - something went wrong'})}
        }
    );
    request.addParameter('id', TYPES.Int, id)

    //request.on('row', (columns) => {
        resolve("Profile has been deleted")
    //});
    connection.execSql(request)})
    
}
module.exports.idDelete = idDelete;

function idUpdate(id, payload){
    return new Promise((resolve, reject) => {
    const sql = 'UPDATE [users].[user] SET username =@username , email =@email, firstname =@firstname, lastname =@lastname, gender =@gender, dob =@dob, bio =@bio  WHERE id =@id'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
        } else if (rowCount == 0) {
            reject({message: 'Cannot update profile - something went wrong'})}
        }
    );
    request.addParameter('username', TYPES.VarChar, payload.username)
    request.addParameter('email', TYPES.VarChar, payload.email)
    request.addParameter('firstname', TYPES.VarChar, payload.firstname)
    request.addParameter('lastname', TYPES.VarChar, payload.lastname)
    request.addParameter('gender', TYPES.VarChar, payload.gender)
    request.addParameter('dob', TYPES.Date, payload.dob)
    request.addParameter('bio', TYPES.VarChar, payload.bio)
    request.addParameter('id', TYPES.Int, id)

    //request.on('row', (columns) => {
        resolve("Profile has been updated")
    //});
    connection.execSql(request)})
    
}
module.exports.idUpdate = idUpdate;