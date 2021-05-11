// her kalder vi vores db.js, således at vi kan anvende funktionerne fra denne nedenfor
const db = require('../shared/db');
// vi kalder JWTcontroller.js, således at vi kan anvende funktionerne fra denne nedenfor
const jwtController = require('../Controller/JWTcontroller');
const userController = require('../Controller/userActionController');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
// nedenfor er angivet vores start db connection samt de CRUD-operations, som admin-brugeren kan udføre
    try{
        await db.startDB(); //start DB connection
    } catch (error){
        console.log("Couldn't connect to database due to error", error.message)
    }
    switch(req.method){
        case 'GET':
            await get(context, req);
            break;
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

// nedenstående funktion finder den pågældende bruger ud fra en jwt-token, der oprettes
// herefter får vi det id, der er forbundet med denne token og finder dette i databasen
async function get(context, req){
    try{
        let id = await jwtController.authenticateToken(req)
        let user = await db.idSelect(id)
        //let userStatus = await userController.adminCheck()
        context.res = {
            body: user
            }
        }
    catch(error) {
        let notValid = {message: 'Validation failed'}
        context.res = {
            status: 400,
            body: notValid
        }
    }
}