const db = require('../shared/db');
const jwtController = require('../Controller/JWTcontroller');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDB(); //start DB connection
    } catch (error){
        console.log("Couldn't connect to database due to error", error.message)
    }
    switch(req.method){
        case 'GET':
            await get(context);
            break;
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function get(context){
    try{
        let user = await db.showallUsers()
        context.res = {
            body: user
            }
        }
    catch(error) {
        console.log("get error")
        context.res = {
            status: 400,
            body: `Error - ${error.message}`
        }
    }
}