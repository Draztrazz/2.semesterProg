const db = require('../shared/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try{
        await db.startDB(); //start DB connection
    } catch (error){
        console.log("Couldn't connect to database due to error", error.message)
    }
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        case 'POST':
            await post(context, req);
            break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function get(context, req){
    try{
        let username = req.query.username;
        let password = req.query.password;
        let user = await db.select(username, password)
        context.res = {
            body: user
        };
    } catch(error) {
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}

/*
async function post(context, req){
    try{
        let username = req.body.username;
        let password = req.body.password
        login = db.select(username, password)
        console.log("test123")
    }
    catch{
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}*/