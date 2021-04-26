const jwt = require('jsonwebtoken');

async function generateToken(user){
    let realToken = jwt.sign({user: user[0].value}, 'secretkey'
    )
    return JSON.stringify(realToken)
}

module.exports.generateToken = generateToken;