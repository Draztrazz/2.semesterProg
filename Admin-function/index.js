// her kalder vi vores db.js, således at vi kan anvende funktionerne fra denne nedenfor
const db = require('../shared/db');
// vi kalder endvidere vores JWTcontroller.js, så vi kan anvende vores tokens derfra
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
// denne async funktion igangsætter vores showallStats fra db.js
async function get(context){
    try{
        let userData = await db.showallStats()
        console.log(userData);
        // vores respons skal være userData, som skal være det data, vi opnår ved hjælp af db.showallStats
        context.res = {
            body: userData
            }
        }
        // hvis der opstår en fejl, printes nedenstående
    catch(error) {
        console.log("get error")
        context.res = {
            status: 400,
            body: `Error - ${error.message}`
        }
    }
}

//Admin find user
// denne funktion anvendens, når admin-brugeren skal finde en bruger af systemet ud fra id
async function searchUser(context, req){
    try{
        // vi requester id, som henter de pågældende informationer der skal bruges fra søgefunktionen
        var id = req.body.id
        // id-inputtet bruges som paramenter i vores idSelect-funktionen og henter deraf useren, som admin-brugeren ønsker at finde
        let user = await db.idSelect(id)
        context.res = {
            body: user
            }
        }
          // hvis der opstår en fejl, printes nedenstående
    catch(error) {
        console.log("get error")
        context.res = {
            status: 400,
            body: `Error - ${error.message}`
        }
    }
}

//Admin update
// denne funktion bruges til, at admin-brugeren kan opdatere andre brugere i systemet
async function adminUpdate(context, req){
    try{
        // vi requester henholdsvis id samt body for at hente de pågældende informationer fra vores frontend, som skal opdateres i databasen
       var id = req.body.id
       let payload = req.body
       // vi anvender ovenstående elementer, som input til vores idUpdate, der ved hjælp af ID finder den bruger, som skal opdateres
       let user = await db.idUpdate(id, payload)
        context.res = {
            body: JSON.stringify(user)
            }
        }
          // hvis der opstår en fejl, printes nedenstående
    catch(error) {
        console.log("get error")
        context.res = {
            status: 400,
            body: `Error - ${error.message}`
        }
    }
}

//Admin delete
// denne funktion tillader admin-brugeren at slette en anden bruger i systemet
async function adminDelete(context, req){
    try{
          // vi requester id for at finde den bruger, der ønskes slettet af admin-brugeren
        var id = req.body.id
        // vi bruger id som parameter i vores idDelete-funktion fra DB
        let user = await db.idDelete(id)
        context.res = {
            body: JSON.stringify(user)
            }
        }
          // hvis der opstår en fejl, printes nedenstående
    catch(error) {
        console.log("get error")
        context.res = {
            status: 400,
            body: `Error - ${error.message}`
        }
    }
}