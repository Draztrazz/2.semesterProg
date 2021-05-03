// her kalder vi vores db.js, således at vi kan anvende funktionerne fra denne nedenfor
const db = require('../shared/db');
// vi kalder JWTcontroller.js, således at vi kan anvende funktionerne fra denne nedenfor
const jwtController = require('../Controller/JWTcontroller');
const userController = require('../Controller/userActionController');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')
// nedenfor er angivet vores start db connection samt de CRUD-operations, som admin-brugeren kan udføre
    try{
        await db.startDB(); //start DB connection
    } catch (error){
        console.log("Couldn't connect to database due to error", error.message)
    }
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

// denne funktion anvendes til at requeste username og password for derigennem at logge ind og tilgået funktionaliteterne i systemet
async function get(context, req){
    try{
        let username = req.query.username;
        let password = req.query.password;
        let user = await db.select(username, password)
        //await userController.loggedIn(user)
        let jwtToken = await jwtController.generateToken(user)
        context.res = {
            body: jwtToken
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
}*/