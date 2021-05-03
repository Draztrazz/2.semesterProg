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
        let loggedId = await jwtController.authenticateToken(req)
        let matches = await db.showMatches(loggedId)
        //console.log(matches)
        context.res = {
            body: matches
        };
    } catch(error) {
        context.res = {
            status: 400,
            body: `${error.message}`
        }
    }
}


async function post(context, req){
    try{
        
        context.res = {
            body: {status: 'Match!'}
            }
    } catch(error) {
        console.log(error.message)
        context.res = {
            body: JSON.stringify(error.message)
        }
    }
}