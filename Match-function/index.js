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
        let minAge = req.query.minAge
        let maxAge = req.query.maxAge
        let gender = req.query.gender
        let id = await jwtController.authenticateToken(req)
        let user = await db.selectMatch(minAge, maxAge, gender, id)
        let matchUser = {
            Firstname: user[8].value,
            Lastname: user[9].value,
            Age: user[11].value,
            Gender: user[10].value,
            Bio: user[12].value
        }
        context.res = {
            body: matchUser
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
        var id = await jwtController.authenticateToken(req)
        let payload = req.body;
        await db.selectMatch(payload)
        context.res = {
            body: {status: 'Succes'}
            }
    } catch(error) {
        context.res = {
            status: 400,
            body: error.message
        }
    }
}*/