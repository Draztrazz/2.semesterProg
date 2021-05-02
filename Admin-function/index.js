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
            await searchUser(context, req);
            break;
        case 'PUT':
            await adminUpdate(context, req);
            break;
        case 'DELETE':
            await adminDelete(context, req);
            break;
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

//Admin find all users 
async function get(context){
    try{
        let userData = await db.showallUsers()
        let matchData = await db.showMatches()
        console.log(userData);
        console.log(matchData);

        let dataPayload = {
            user: userData,
            match: matchData
        }
        context.res = {
            body: dataPayload
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

//Admin find user
async function searchUser(context, req){
    try{
        var id = req.body.id
        let user = await db.idSelect(id)
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

//Admin update
async function adminUpdate(context, req){
    try{
       var id = req.body.id
       let payload = req.body
       let user = await db.idUpdate(id, payload)
        context.res = {
            body: JSON.stringify(user)
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

//Admin delete
async function adminDelete(context, req){
    try{
        var id = req.body.id
        let user = await db.idDelete(id)
        context.res = {
            body: JSON.stringify(user)
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