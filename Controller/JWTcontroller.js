const jwt = require('jsonwebtoken');

async function generateToken(user){
    let realToken = jwt.sign({user: user[0].value}, 'secretkey'
    )
    return JSON.stringify(realToken)
}

module.exports.generateToken = generateToken;


/*async function authenticateToken(req){
    const token = req.query.id
    if (token == null){return res.sendStatus(401)}

    decoded = jwt.verify(token, 'secretkey')
    return decoded.user
    }

module.exports.authenticateToken = authenticateToken*/

async function authenticateToken(req){
    const token = req.query.id || req.body
    if (token == null){return res.sendStatus(401)}

    decoded = jwt.verify(token, 'secretkey')
    return decoded.user
    }

module.exports.authenticateToken = authenticateToken
