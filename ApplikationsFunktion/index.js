// her kalder vi vores db.js, således at vi kan anvende funktionerne fra denne nedenfor
const db = require('../shared/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

// nedenfor er angivet vores start db connection samt de CRUD-operations, som en bruger kan udføre
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

// dette er vores login-funktion, som køres ved hjælp af db
async function get(context, req){
    try{
        // vi requesterer username, og anvender dette som input i vores select-funktion for at identificere den bruger, der ønsker at logge ind
        let username = req.query.username;
        let user = await db.select(username)
        context.res = {
            body: user
        };
         // hvis der opstår en fejl, printes nedenstående
    } catch(error) {
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}

// denne post-operation bruges til at sende data fra frontend, hvor brugeren ønsker at oprette sig i systemet, ind i databasen og derigennem oprette en bruger
async function post(context, req){
    try{
        // her requester vi alle de informationer, der indtastes for at oprette en bryger
        let payload = req.body;
        // vi anvender ovenstående payload som input i vores insert-funktion for at oprette en bruger
            await db.insert(payload)
            context.res = {
                body: {status: 'Succes'}
                }
        // hvis der opstår en fejl, printes nedenstående
    } catch(error) {
        context.res = {
            status: 400,
            body: error.message
        }
    }
}