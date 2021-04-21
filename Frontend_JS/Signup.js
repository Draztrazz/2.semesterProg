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

const usernameValue = document.getElementById('username').value;
const passwordValue = document.getElementById('password').value;
const emailValue = document.getElementById('email').value;
const ageValue = document.getElementById('age').value;
const firstnameValue = document.getElementById('firstname').value;
const lastnameValue = document.getElementById('lastname').value;
const genderValue = document.getElementById('gender').value;
const bioValue = document.getElementById('bio').value;


form.addEventListener('submit', function(e) {
    e.preventDefault()

    let inputValidated = true;

    checkInputs();

        if(inputValidated == true){
            postUser();
        } else {
            console.log('fail');
            return false
        }
})

function checkInputs(){
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccesFor(username);
    }

    if (password === '') {
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
                username: usernameValue,
                password: passwordValue,
                admin: admin,
                email: emailValue,
                firstname: firstnameValue,
                lastname: lastnameValue,
                gender: genderValue,
                age: ageValue,
                bio: bioValue
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