const jwt = require('jsonwebtoken');

// denne funktion laber en jwt-token ud fra den bruger, som logger ind i systemet
async function generateToken(user){
    let realToken = jwt.sign({user: user[0].value}, 'secretkey'
    )
    return JSON.stringify(realToken)
}
// her eksporterer vi funktionen, således at vi kan anvende den i andre js-filer
module.exports.generateToken = generateToken;

// denne funktion laber en jwt-token ud fra den bruger, som logger ind i systemet
async function generateOtherToken(user){
    let realToken = jwt.sign({user: user[3].value}, 'secretkey'
    )
    return realToken
}
// her eksporterer vi funktionen, således at vi kan anvende den i andre js-filer
module.exports.generateOtherToken = generateOtherToken;

/*async function authenticateToken(req){
    const token = req.query.id
    if (token == null){return res.sendStatus(401)}

    decoded = jwt.verify(token, 'secretkey')
    return decoded.user
    }

module.exports.authenticateToken = authenticateToken*/

// denne funktion vurderer om det er en eksisterende jwt-token, der forsøger at tilgå systemet
async function authenticateToken(req){
    //console.log(req.body);
    const token = req.query.id || req.body.id || req.body.id1
    if (token == null){return res.sendStatus(401)}

    decoded = jwt.verify(token, 'secretkey')
    return decoded.user
    }

// her eksporterer vi funktionen, således at vi kan anvende den i andre js-filer
module.exports.authenticateToken = authenticateToken

// denne funktion vurderer om det er en eksisterende jwt-token, der forsøger at tilgå systemet
async function authenticateOtherToken(req){
    //console.log(req.body.id2);
    const token = req.body.id2
    if (token == null){return res.sendStatus(401)}

    decoded = jwt.verify(token, 'secretkey')
    return decoded.user
    }

// her eksporterer vi funktionen, således at vi kan anvende den i andre js-filer
module.exports.authenticateOtherToken = authenticateOtherToken
