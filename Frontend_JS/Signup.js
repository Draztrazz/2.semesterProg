const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const age = document.getElementById('age');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const bio = document.getElementById('bio');
const admin = 0;

form.addEventListener('submit', function(e) {
    e.preventDefault()

    checkInputs();
})

function checkInputs(){
    let inputValidated = true;

    const usernameValue = username.value;
    const passwordValue = password.value;
    const emailValue = email.value;
    const ageValue = age.value;
    const firstnameValue = firstname.value;
    const lastnameValue = lastname.value;
    
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccesFor(username);
    }
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccesFor(password);
    }
    if (emailValue === '') {
        setErrorFor(email, 'E-mail cannot be blank');
    } else {
        setSuccesFor(email);
    }
    if (firstnameValue === '') {
        setErrorFor(firstname, 'First name cannot be blank');
    } else {
        setSuccesFor(firstname);
    }
    if (lastnameValue === '') {
        setErrorFor(lastname, 'Last name cannot be blank');
    } else {
        setSuccesFor(lastname);
    }
    if (ageValue === '') {
        setErrorFor(age, 'age cannot be blank');
    } else {
        setSuccesFor(age);
    }

    if(inputValidated == true){
        postUser();
    } else {
        console.log('fail');
        return false
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')
    small.innerText = message;

    formControl.className = 'form-control error';

    inputValidated = false;
}

function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control succes';
}

function postUser(){
    fetch('http://localhost:7071/api/ApplikationsFunktion', {
        method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                admin: admin,
                email: email.value,
                firstname: firstname.value,
                lastname: lastname.value,
                gender: gender.value,
                age: age.value,
                bio: bio.value
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
}