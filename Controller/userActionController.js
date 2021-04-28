const classes = require('../Classes/userClasses')

async function loggedIn(user){
    console.log(user[3].value)
    if(user[3].value == 0) {
        let loggedUser = new classes.User(
            user[0].value,
            user[1].value,
            user[2].value,
            user[4].value,
            user[5].value,
            user[6].value,
            user[7].value,
            user[8].value,
            user[9].value
        )
        console.log(loggedUser)
    } else if(user.admin == 1) {
        let adminUser = new classes.Admin(
            user.username,
            user.password,
            user.email,
            user.firstname,
            user.lastname,
            user.gender,
            user.dob,
            user.bio
        )
        console.log(adminUser)
    }
}

module.exports.loggedIn = loggedIn;