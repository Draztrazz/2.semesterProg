const db = require('../shared/db');
const signupController = require('../Controller/signupController');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); //start DB connection
    } catch (error){
        console.log("Couldn't connect to database due to error", error.message)
    }
    switch(req.method){
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


//module.exports = User

async function get(context, req){
    try{
        let username = req.query.username;
        let user = await db.select(username)
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

async function post(context, req){
    try{
        let payload = req.body;
        //await signupController.checkInputs(payload)
        if(signupController.checkInputs.resolved(payload)){
            await db.insert(payload)
            context.res = {
                body: {status: 'Succes'}
                }
        } else {
            context.res = {
                body: {status: 'Fail'}
            }
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: error.message
    }
}
}