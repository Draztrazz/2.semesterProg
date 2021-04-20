var form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    var email = document.getElementById('email').value
    var age = document.getElementById('age').value
    var firstname = document.getElementById('firstname').value
    var lastname = document.getElementById('lastname').value
    var gender = document.getElementById('gender').value
    var bio = document.getElementById('bio').value
    var admin = 0

    fetch('http://localhost:7071/api/ApplikationsFunktion', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            admin: admin,
            email: email,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            age: age,
            bio: bio
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }) .catch((err) =>{
        console.log(err)
    })
})