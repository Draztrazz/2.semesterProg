let jwt = localStorage.getItem("JWT");

const username = document.getElementById("username");
const email = document.getElementById("email");
const dob = document.getElementById('dob');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const bio = document.getElementById('bio');

let adminUpdateButton = document.getElementById("adminupdateuser");

adminUpdateButton.addEventListener('click', function(e) {
    e.preventDefault()
    checkInputs();
})

// check inputs
function checkInputs(){
    let inputValidated = true;

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
    
    if(inputValidated == true){
        adminUpdateUser();
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

// calculate age
function calculate_age(dob) {
    var ageDif = Date.now() - new Date(dob).getTime();
    var ageDate = new Date(ageDif);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

let adminSearchButton = document.getElementById("searchuser");

//Retrieve information regarding a profile
adminSearchButton.addEventListener("click", function(){
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
        .then(function(data) {
            console.log(data)
            document.getElementById("IDretrieved").innerHTML = data[0].value
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


//Update function

function adminUpdateUser(){
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
        .then(function(data) {
            console.log(data)
            console.log("Profile has been updated")
            location.href = '../Frontend_HTML/Adminpage.html'
        })
        .catch(function(err){
            console.log(err)
            
        })
}



// Admin delete function
let deleteButton = document.getElementById("admindeleteuser");

deleteButton.addEventListener("click", function(){
        let id1 = document.getElementById("searchinput").value;

        var txt;
        var deleteUserBox = prompt("Please enter DELETE to delete the profile:",);
        if (deleteUserBox == null || deleteUserBox == "") {
            txt = "You have not deleted the profile";
        } else if(deleteUserBox == "DELETE") {
            fetch(`http://localhost:7071/api/superior`, {
                method: "DELETE",
                body: JSON.stringify({id: id1}),//nu piller vi ikke mere ved delete - det her virker måske. vi har ændret i jwt-controller
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                }
            })
            .then((resp) => resp.json()
            )
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