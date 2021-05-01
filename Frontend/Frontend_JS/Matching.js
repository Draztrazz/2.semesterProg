let jwt = localStorage.getItem("JWT");

const minAge = document.getElementById('minAge');
const maxAge = document.getElementById('maxAge');
const gender = document.getElementById('gender1');

let setPreferences = document.getElementById("setPreferences");


setPreferences.addEventListener('click', function(e) {
    e.preventDefault()
    checkInputs();
})

// check inputs
function checkInputs(){
    let inputValidated = true;

    const dobValue1 = minAge.value;
    const dobValue2 = maxAge.value;

    if (dobValue1 && dobValue2 == '') {
        setErrorFor(minAge && maxAge, 'Date of birth cannot be blank.');
    } else if (dobValue1 < 18) {
        setErrorFor(minAge, 'You must 18 or older to use this app.');
    } else {
        setSuccesFor(minAge && maxAge);
    }
    /*if (bioValue == ''){
        bioValue = 'You have not yet written your own bio.'
    }*/
    
    if(inputValidated == true){
        findUsers();
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



function findUsers (){

    const minAge1 = document.getElementById('minAge').value;
    const maxAge1 = document.getElementById('maxAge').value;
    const gender1 = document.getElementById('gender1').value;


    fetch(`http://localhost:7071/api/match?id=${jwt}&minAge=${minAge1}&maxAge=${maxAge1}&gender=${gender1}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById("firstname").innerHTML = data.Firstname
                document.getElementById("lastname").innerHTML = data.Lastname
                document.getElementById("dob").innerHTML = data.Age
                document.getElementById("gender2").innerHTML = data.Gender
                document.getElementById("bio").innerHTML = data.Bio
            }) .catch((err) =>{
                console.log(err)
            })
}