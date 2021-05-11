let jwt = localStorage.getItem("JWT");

window.addEventListener('load', () => {
    fetch(`http://localhost:7071/api/homepage?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            // hvis der findes en eksisterende jwt-token, er forbrugeren logget ind og redirectes dermed til homepage for brugeren
            console.log(data);
            if(data.message != null){
                return false
            } else {
                location.href = '../Frontend_HTML/Homepage.html'
            }
        })
        .catch(function(err){
            console.log(err)
        })
})


// vi henter de elementer fra html, der anvendes til at oprette en bruger i systemet
const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const bio = document.getElementById('bio');

// ud fra ovenstående elementer, igangsættes denne addEventListener, når man trykker submit for at oprette en bruger
// herefter køres en funktion, der validerer om informationerne efterlever vores kriterier
form.addEventListener('submit', function(e) {
    e.preventDefault()
    checkInputs();
})

// denne funktion validerer inputs
function checkInputs(){
    let inputValidated = true;
    console.log(gender.value)
    // vi finder den indtastede værdi fra inputfelterne i html
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
    /*if (bioValue == ''){
        bioValue = 'You have not yet written your own bio.'
    }*/

    // hvis validering er succesfuld, så igangsættes nedenstående funktion
    if(inputValidated == true){
        postUser();
    } else {
        return false
    }
}

// denne funktion håndterer fejlbeskeder
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

// funktionen her, anvender vi POST-operation til at oprette en bruger i databasen, når valideringen er succesfuld
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
                dob: dob.value,
                bio: bio.value
            }),
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                }
            })
            // hvis oprettelsen er succesfuld, kører nedenstående, hvorefter man får en besked om at skulle logge ind for at komme i gang
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                if(data = 'Succes') {
                    location.href = '../Frontend_HTML/Frontpage.html';
                    alert('Your account was created. Log in to start matching!')
                }
            }) .catch((err) =>{
                console.log(err)
            })
}
// calculate age
// her beregner vi alderen, og gemmer den som en int
// getTime finder milisekunder
function calculate_age(dob) {
    var ageDif = Date.now() - new Date(dob).getTime();
    var ageDate = new Date(ageDif);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}