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
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function get(context, req){
    try{
        let loggedId = await jwtController.authenticateToken(req)
        let matches = await db.showMatches(loggedId)
        let matchedArray = []
        for(let i=0; i<matches.length;i++){
                let matchedUser = {
                    id: await jwtController.generateOtherToken(matches[i][2].value),
                    firstname: matches[i][4].value,
                    lastname: matches[i][5].value
                }
            matchedArray.push(matchedUser)
        }
        //console.log(matchedArray)
        context.res = {
            body: matchedArray
        };
    } catch(error) {
        console.log(error)
        context.res = {
            status: 400,
            body: error.message
        }
    }
}


async function post(context, req){
    try{
        let viewedMatchId = await jwtController.authenticateToken(req)
        let matchedUser = await db.idSelect(viewedMatchId)
        let matchedUserInfo = {
            firstname: matchedUser[5].value,
            lastname: matchedUser[6].value,
            gender: matchedUser[7].value,
            age: matchedUser[10].value,
            bio: matchedUser[9].value
        }
        context.res = {
            body: matchedUserInfo
            }
    } catch(error) {
        console.log(error.message)
        context.res = {
            body: JSON.stringify(error.message)
        }
    }
}


async function deleteFunction(context, req){
    try{
       let id1 = await jwtController.authenticateToken(req);
       let id2 = await jwtController.authenticateOtherToken(req);
       await db.deleteMatch(id1, id2);
       await db.deleteLikes(id1, id2);
        context.res = {
            body: {status: 'Succes'}
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