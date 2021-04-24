const db = require('../shared/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

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
}