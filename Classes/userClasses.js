class User{
    constructor(username, password, admin, email, firstname, lastname, gender, age,  bio){
        this.username = username,
        this.password = password,
        this.admin = 0,
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

class Admin extends User{
    constructor(username, password, admin, email, firstname, lastname, gender, age, bio){
        super(username, password, admin, email, firstname, lastname, gender, age,  bio)
    }
}