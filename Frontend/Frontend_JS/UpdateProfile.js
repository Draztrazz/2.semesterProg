let jwt = localStorage.getItem("JWT");

// her hentes de informationer, der er mulige at opdatere for en bruger
const username = document.getElementById('username');
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const bio = document.getElementById('bio');

// denne variable henviser til den knap, som brugeren anvender til at opdatere en bruger
let updateButton = document.getElementById("updateuser");

// ovenstående knap igangsætter denne addEventListener, således brugeren kan opdatere sine informationer
// dog skal der først valideres for de informationer, der indtastes
updateButton.addEventListener('click', function(e) {
    e.preventDefault()
    checkInputs();
})

// denne funktion validerer inputs
function checkInputs(){
    let inputValidated = true;

     // vi finder den indtastede værdi fra inputfelterne i html
    const usernameValue = username.value;
    const emailValue = email.value;
    const dobValue = dob.value;
    const firstnameValue = firstname.value;
    const lastnameValue = lastname.value;
    
    if (usernameValue == '' || usernameValue.length < 8 || usernameValue.length > 20) {
        setErrorFor(username, 'Username must be between 8 and 20 characters long.');
    } else {
        setSuccesFor(username);
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

    // hvis validering er succesfuld, så igangsættes nedenstående funktion
    if(inputValidated == true){
        userUpdateProfile();
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

// calculate age
// her beregner vi alderen, og gemmer den som en int
// getTime finder milisekunder
function calculate_age(dob) {
    var ageDif = Date.now() - new Date(dob).getTime();
    var ageDate = new Date(ageDif);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// denne funktion henter nuværende information for den pågældende bruger
window.addEventListener("load", function(){

    fetch(`http://localhost:7071/api/profile?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            // nedenstående getElementById indsætter information fra databasen i inputfelterne ved hjælp af .value
            console.log(data)
            document.getElementById("username").value = data[1].value
            document.getElementById("email").value = data[4].value
            document.getElementById("firstname").value = data[5].value
            document.getElementById("lastname").value = data[6].value
            document.getElementById("dob").value = data[8].value
            document.getElementById("gender").value = data[7].value
            document.getElementById("bio").value = data[9].value
            
        })
        .catch(function(err){
            console.log(err)
            location.href = '../Frontend_HTML/Frontpage.html'
        })
})



// denne funktion igangsættes, når valideringen har fundet sted
// vi opdaterer ved hjælp af id og jwt, der finder den pågældende bruger i db
function userUpdateProfile() {

    fetch(`http://localhost:7071/api/profile`, {
        method: "PUT",
        body: JSON.stringify({
                id: jwt,
                username: username.value,
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
        .then((resp) => resp.json()
        )
        // hvis det er en succces, redirectes brugeren til profilepage
        .then(function(data) {
            console.log(data)
            location.href = '../Frontend_HTML/Profilepage.html'
        })
        .catch(function(err){
            console.log(err)
        })
}

