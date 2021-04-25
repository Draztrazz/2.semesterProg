const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const bio = document.getElementById('bio');

form.addEventListener('submit', function(e) {
    e.preventDefault()
    checkInputs();
})

function checkInputs(){
    let inputValidated = true;

    const usernameValue = username.value;
    const passwordValue = password.value;
    const emailValue = email.value;
    const dobValue = dob.value;
    const firstnameValue = firstname.value;
    const lastnameValue = lastname.value;
    
    if (usernameValue == '' || usernameValue.length < 8 || usernameValue.length > 20) {
        setErrorFor(username, 'Username must be between 8 and 20 characters long.');
    } else {
        setSuccesFor(username);
    }
    if (passwordValue == '' || passwordValue.length < 8 || passwordValue.length > 20) {
        setErrorFor(password, 'Password must be between 8 and 20 characters long.');
    } else {
        setSuccesFor(password);
    }
    if (emailValue == '') {
        setErrorFor(email, 'E-mail cannot be blank.');
    } else {
        setSuccesFor(email);
    }
    if (firstnameValue == '') {
        setErrorFor(firstname, 'First name cannot be blank.');
    } else if (firstnameValue.length > 20) {
        setErrorFor(firstname, 'First name cannot be longer than 20 characters.');
    } else {
        setSuccesFor(firstname);
    }
    if (lastnameValue == '') {
        setErrorFor(lastname, 'Last name cannot be blank.');
    } else if (lastnameValue.length > 20) {
        setErrorFor(lastname, 'Last name cannot be longer than 20 characters.');
    } else {
        setSuccesFor(lastname);
    }
    if (dobValue == '') {
        setErrorFor(dob, 'Date of birth cannot be blank.');
    } else if (calculate_age(dobValue) < 18) {
        setErrorFor(dob, 'You must 18 or older to use this app.');
    } else {
        setSuccesFor(dob);
    }

    if(inputValidated == true){
        postUser();
    } else {
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
    fetch('http://localhost:7071/api/signup', {
        method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                email: email.value,
                firstname: firstname.value,
                lastname: lastname.value,
                gender: gender.value,
                age: dob.value,
                bio: bio.value
            }),
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                }
            })
            .then(res => res.json())
            .then((data) => {
                
                console.log(data)
            }) .catch((err) =>{
                console.log(err)
            })
}

function calculate_age(dob) {
    var ageDif = Date.now() - new Date(dob).getTime();
    var ageDate = new Date(ageDif); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}