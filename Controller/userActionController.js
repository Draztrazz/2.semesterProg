const classes = require('../Classes/userClasses')

async function loggedIn(user){
    if(user.admin = 0) {
        let loggedUser = new classes.User(
            user.username,
            user.password,
            user.email,
            user.firstname,
            user.lastname,
            user.gender,
            user.dob,
            user.bio
        )
        console.log(loggedUser)
    } else if(user.admin = 1) {
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