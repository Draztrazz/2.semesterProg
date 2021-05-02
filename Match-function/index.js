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
        let user = await db.selectMatch(id, minAge, maxAge, gender)
        let otherUser = await jwtController.generateOtherToken(user)
        let matchUser = {
            Id: otherUser,
            Firstname: user[8].value,
            Lastname: user[9].value,
            Age: user[13].value,
            Gender: user[10].value,
            Bio: user[12].value
        }
        context.res = {
            body: matchUser
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
        let id1 = await jwtController.authenticateToken(req)
        let id2 = await jwtController.authenticateOtherToken(req)
        let payload = {
            id1: id1,
            userStatus: req.body.userStatus,
            id2: id2
        }
        //await db.insertOpinion(payload)
        await db.determineMatch(id1, id2)
        await db.insertMatch(id1, id2)
        context.res = {
            body: {status: 'Match!'}
            }
    } catch(error) {
        context.res = {
            status: 400,
            body: error.message
        }
    }
}