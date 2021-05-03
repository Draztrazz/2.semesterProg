let jwt = localStorage.getItem("JWT");

// vi bruger getElementById til at hente data fra inputfelter i relation til update og visning af brugere
const username = document.getElementById("username");
const email = document.getElementById("email");
const dob = document.getElementById('dob');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const bio = document.getElementById('bio');

// vi definerer den knap, der skal anvendes i vores nedenstående addEventListener
let adminUpdateButton = document.getElementById("adminupdateuser");

// når der trykkes på ovenstående knap i HTML igangsættes denne addEventListener
adminUpdateButton.addEventListener('click', function(e) {
    e.preventDefault()
    checkInputs();
})

// check inputs
// dette er vores validering af inputs, hvor vi kontrollerer om vores kriterier fra signup opfyldes i update
function checkInputs(){
    let inputValidated = true;

    // vi finder værdien af variable, som vi definerede ovenfor
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
    /*if (bioValue == ''){
        bioValue = 'You have not yet written your own bio.'
    }*/
    
    // hvis validering er overholdt igangsætter vi vores adminupdate-funktion
    if(inputValidated == true){
        adminUpdateUser();
    } else {
        return false
    }
}
// hvis der er fejl, printes den pågældende fejl ud fra denne error-handler
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

// her definerer den knap, der anvendes til at søge på en bruger
let adminSearchButton = document.getElementById("searchuser");

// her anvendes ovenstående knap tl at igangsætte vores søgefunktion for admin-brugeren
adminSearchButton.addEventListener("click", function(){
    // admin-brugeren søger ud fra id på den bruger, der ønskes hentet
    let id1 = document.getElementById("searchinput").value;
    fetch(`http://localhost:7071/api/superior`, {
        method: "POST",
        body: JSON.stringify({
            id: id1
    }),
    headers: {
        "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((resp) => resp.json()
    )
        // hvis der er tale om en succes, hentes informationer fra databasen og indsættes i AdminSearch.html
        .then(function(data) {
            console.log(data)
            // innerHTML anvendes til paragraphs
            document.getElementById("IDretrieved").innerHTML = data[0].value
            // value anvendes til de inputfelter, som admin-brugeren skal kunne rette i
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
            //location.href = '../Frontend_HTML/Frontpage.html'
        })
})


// dette er funktionen, der igangsættes når admin-brugeren skal opdatere en bruger i systemet
function adminUpdateUser(){
    // her anvendes id på den pågældende bruger til at opdatere i databasen
    let id1 = document.getElementById("searchinput").value;
    fetch(`http://localhost:7071/api/superior`, {
        
        method: "PUT",
        body: JSON.stringify({
                id: id1,
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
        // hvis det er en succes, opdateres brugeren, og dernæst redirectes admin-brugeren til startsiden for admin-brugeren
        .then(function(data) {
            console.log(data)
            console.log("Profile has been updated")
            location.href = '../Frontend_HTML/Adminpage.html'
        })
        .catch(function(err){
            console.log(err)
            
        })
}



// dette er delete funktionen for admin-brugeren, der igangsættes
// ved hjælp af en knap kan vi igangsætte nedenstående addEventListener. Denne knap er identificeret ved hjælp af getElementById for at henvise til den rigtige HTML-knap
let deleteButton = document.getElementById("admindeleteuser");
// nedenfor anvendes vores knap til at igangsætte delete-funktionen
deleteButton.addEventListener("click", function(){
        // id bruges til at finde den bruger, der skal slettes i databasen
        let id1 = document.getElementById("searchinput").value;

        var txt;
        // det ses, at funktionen virker ved at man skriver DELETE for at slette en bruger. Dette skal stå i en inputboks, der kommer frem, når man trykker på ovenstående knap
        var deleteUserBox = prompt("Please enter DELETE to delete the profile:",);
        // hvis der ikke er noget input eller lignende, sker der ikke noget - profilen slettes ikke
        if (deleteUserBox == null || deleteUserBox == "") {
            txt = "You have not deleted the profile";
            // hvis inputtet er rigtigt (DELETE), så igangsættes vores fetch, der sletter en bruger ud fra brugerid
        } else if(deleteUserBox == "DELETE") {
            fetch(`http://localhost:7071/api/superior`, {
                method: "DELETE",
                body: JSON.stringify({id: id1}),
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                }
            })
            .then((resp) => resp.json()
            )
            // når en bruger slettes, bliver admin-brugeren returneret til hovedsiden for admin-brugeren
            .then(function(data) {
                console.log(data)
                console.log("Profile has been deleted")
            location.href = '../Frontend_HTML/Adminpage.html'
            })
            .catch(function(err){
                console.log(err)
            })
            
        }
        document.getElementById("notDeletedAdmin").innerHTML = txt;
})