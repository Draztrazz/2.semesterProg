const User = require('../ApplikationsFunktion/index');

const user1 = new User('mike123', 'password', 0, 'asfas@asfasf.dc', 'sfdasfs', 'sadsaas', 'male', 22, 'safasa');

console.log(user1)

function checkInputs(payload){
    return new Promise((resolve, reject) => {
    let inputValidated = true;
    let newUser = new User(
        payload.username, 
        payload.password, 
        0, 
        payload.email, 
        payload.firstname, 
        payload.lastname, 
        payload.gender, 
        payload.age, 
        payload.bio
    );
    if(newUser.username == ''){
        newUser.username = 0;
        inputValidated = false
    } 
    if(inputValidated == false){
        reject(newUser)
    } else {
        resolve(newUser)
    }
    })
}

module.exports.checkInputs = checkInputs