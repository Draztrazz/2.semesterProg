/*const User = require('../ApplikationsFunktion/index.js');

const user1 = new User('mike123', 'password', 0, 'asfas@asfasf.dc', 'sfdasfs', 'sadsaas', 'male', 22, 'safasa');

console.log(user1)
class User{
    constructor(username, password, admin, email, firstname, lastname, gender, age,  bio){
        this.username = username,
        this.password = password,
        this.email = email,
        this.firstname = firstname,
        this.lastname = lastname,
        this.gender = gender,
        this.age = age,
        this.bio = bio
    }

    calculate_age() {
        var today = new Date();
        var yearCounter = 0;
    
        var month = today.getMonth()
        if (month<this.birthDay.getMonth()){
            yearCounter = 1;
        }
        else if (today.getMonth() == this.birthDay.getMonth()&&today.getDay() == this.birthDay.getDay()){
            yearCounter = 1;
        }
    
    var age = today.getFullYear()-this.birthDay.getFullYear()-yearCounter;
    return age;
    
    }
}

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
        inputValidated = false
    } 
    if(inputValidated == false){
        reject({message: 'Something went wrong'})
    } else {
        resolve(newUser)
    }
    })
}

module.exports.checkInputs = checkInputs*/