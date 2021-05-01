let jwt = localStorage.getItem("JWT");

const minAge = document.getElementById('minDob');
const maxAge = document.getElementById('maxDob');
const gender = document.getElementById('gender');

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
    } else if (calculate_age(dobValue1) < 18) {
        setErrorFor(minAge, 'You must 18 or older to use this app.');
    } else {
        setSuccesFor(minAge && maxAge);
    }
    /*if (bioValue == ''){
        bioValue = 'You have not yet written your own bio.'
    }*/
    
    if(inputValidated == true){
        findUsersfu();
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

    const minAge1 = document.getElementById('minDob').value;
    const maxAge1 = document.getElementById('maxDob').value;
    const gender1 = document.getElementById('gender').value;


    fetch(`http://localhost:7071/api/match?id=${jwt}&minAge=${minAge1}&maxAge=${maxAge1}&gender=${gender1}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById("firstname").innerHTML = data[8].value
                document.getElementById("lastname").innerHTML = data[9].value
                document.getElementById("dob").innerHTML = data[11].value
                document.getElementById("gender").innerHTML = data[10].value
                document.getElementById("bio").innerHTML = data[12].value
            }) .catch((err) =>{
                console.log(err)
            })
}