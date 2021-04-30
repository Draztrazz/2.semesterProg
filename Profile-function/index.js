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
        case 'DELETE':
            await deleteFunction(context, req);
            break
        case 'PUT':
            await updateFunction(context, req);
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
        var id = await jwtController.authenticateToken(req)
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

async function deleteFunction(context, req){
    try{
       var id = await jwtController.authenticateToken(req)
       let user = await db.idDelete(id)
       console.log(user)
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

async function updateFunction(context, req){
    try{
       var id = await jwtController.authenticateToken(req)
       let payload = req.body
       let user = await db.idUpdate(id, payload)
       console.log(user)
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