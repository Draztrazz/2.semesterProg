const db = require('../shared/db');

async function login(context, req){
    try{
        let username = req.query.username;
        let password = req.query.password
        login = db.select(username, password)
        console.log(login)
    }
    catch{
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}