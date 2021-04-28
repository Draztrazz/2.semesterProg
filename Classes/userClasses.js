class User{
    constructor(username, password, email, firstname, lastname, gender, dob,  bio){
        this.username = username,
        this.password = password,
        this.email = email,
        this.firstname = firstname,
        this.lastname = lastname,
        this.gender = gender,
        this.dob = dob,
        this.bio = bio
    }
}



class Admin extends User{
    constructor(username, password, admin, email, firstname, lastname, gender, age, bio){
        super(username, password, email, firstname, lastname, gender, age,  bio)
        this.admin = admin
    }
}

module.exports = {
    User: User,
    Admin: Admin
}