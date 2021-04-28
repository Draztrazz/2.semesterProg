class User{
    constructor(id, username, password, email, firstname, lastname, gender, dob,  bio){
        this.id = id;
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
    constructor(id, username, password, admin, email, firstname, lastname, gender, age, bio){
        super(id, username, password, email, firstname, lastname, gender, age,  bio)
        this.admin = admin
    }
}

module.exports = {
    User: User,
    Admin: Admin
}