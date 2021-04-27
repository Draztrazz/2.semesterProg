const jwt = require('jsonwebtoken');

async function generateToken(user){
    let realToken = jwt.sign({user: user[0].value}, 'secretkey'
    )
    return JSON.stringify(realToken)
}

module.exports.generateToken = generateToken;


async function authenticateToken(req){
    const token = req.query.id
    if (token == null){return res.sendStatus(401)}

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err){throw err}
        req.user = user
        console.log("jwttest")
        return req.user
    })
 
}
module.exports.authenticateToken = authenticateToken
