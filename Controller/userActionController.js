const classes = require('../Classes/userClasses')

let loggedUser = 0;
let adminUser = 0;

async function loggedIn(user){
    //console.log(user[3].value)
    if(user[3].value == 0) {
        loggedUser = new classes.User(
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
    } else if(user[3].value == 1) {
        adminUser = new classes.Admin(
            user[0].value,
            user[1].value,
            user[2].value,
            user[3].value,
            user[4].value,
            user[5].value,
            user[6].value,
            user[7].value,
            user[8].value,
            user[9].value
        )
    }
}

module.exports.loggedIn = loggedIn;
/*
async function adminCheck(){
    if(loggedUser != 0){
        return loggedUser
    } else if(adminUser != 0){
        return adminUser
    }
}

module.exports.adminCheck = adminCheck*/