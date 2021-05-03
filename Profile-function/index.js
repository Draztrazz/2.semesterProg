// her kalder vi vores db.js, således at vi kan anvende funktionerne fra denne nedenfor
const db = require('../shared/db');
// vi kalder JWTcontroller.js, således at vi kan anvende funktionerne fra denne nedenfor
const jwtController = require('../Controller/JWTcontroller');

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

// nedenstående funktion finder den pågældende bruger ud fra en jwt-token, der oprettes
// herefter får vi det id, der er forbundet med denne token og finder dette i databasen
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

// dette er vores delete-function, hvor en bruger slettes ud fra jwt og det pågældende brugerid
// ved hjælp af jwt finder vi det pågældende brugerid for den bruger, der ønskes slettet
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

// update-funktionen nedenfor udføres ved hjælp af jwt og id
// på baggrunbd af en jwt-token kan vi identificere det id for den bruger, hvor informationerne skal opdateres
// endvidere angiver vi payload til at være de informationer, der skal opdateres jævnfør nedenstående variable
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