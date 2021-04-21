var form = document.getElementById('form');

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const gender = document.getElementById('gender').value;
    const bio = document.getElementById('bio').value;
    const admin = 0;

form.addEventListener('submit', function(e) {
    e.preventDefault()
    


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

function checkInputs(){
    if (username === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccesFor(username);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}

function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control succes';
}