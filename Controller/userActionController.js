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
    } else if(user[3].value == 1) {
        let adminUser = new classes.Admin(
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
        console.log(adminUser)
    }
}

module.exports.loggedIn = loggedIn;

async function adminCheck(){
    if(loggedUser == true){
        return 'Plebian'
    } else if(adminUser == true){
        return 'Demi-god'
    }
}