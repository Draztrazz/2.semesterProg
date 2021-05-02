const db = require('../shared/db');
const jwtController = require('../Controller/JWTcontroller');
const userController = require('../Controller/userActionController');


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
        let id = await jwtController.authenticateToken(req)
        db.ageUpdate(id)
        let user = await db.idSelect(id)
        //let userStatus = await userController.adminCheck()
        context.res = {
            body: user
            }
        }
    catch(error) {
        context.res = {
            status: 400,
            body: `Error - ${error.message}`
        }
    }
}