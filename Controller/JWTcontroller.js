const jwt = require('jsonwebtoken');

async function generateToken(user){
    let realToken = jwt.sign({user: user[0].value}, 'secretkey'
    )
    return JSON.stringify(realToken)
}

module.exports.generateToken = generateToken;

async function generateOtherToken(user){
    let realToken = jwt.sign({user: user[3].value}, 'secretkey'
    )
    return realToken
}

module.exports.generateOtherToken = generateOtherToken;

/*async function authenticateToken(req){
    const token = req.query.id
    if (token == null){return res.sendStatus(401)}

    decoded = jwt.verify(token, 'secretkey')
    return decoded.user
    }

module.exports.authenticateToken = authenticateToken*/

async function authenticateToken(req){
    //console.log(req.body);
    const token = req.query.id || req.body.id || req.body.id1
    if (token == null){return res.sendStatus(401)}

    decoded = jwt.verify(token, 'secretkey')
    return decoded.user
    }

module.exports.authenticateToken = authenticateToken

async function authenticateOtherToken(req){
    //console.log(req.body);
    const token = req.body.id2
    if (token == null){return res.sendStatus(401)}

    decoded = jwt.verify(token, 'secretkey')
    return decoded.user
    }

module.exports.authenticateOtherToken = authenticateOtherToken
