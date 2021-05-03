// her laver vi den klasse for vores brugere i systemet
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


// vi laver nedarvning af user-klassen for at oprette en admin-klasse
class Admin extends User{
    constructor(id, username, password, admin, email, firstname, lastname, gender, age, bio){
        super(id, username, password, email, firstname, lastname, gender, age,  bio)
        this.admin = admin
    }
}
// vi eksporterer begge klasser, således at det er muligt at anvende dem i andre js-filer
module.exports = {
    User: User,
    Admin: Admin
}