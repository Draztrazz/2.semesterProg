// vi henter information fra vores frontend, der skal anvendes i vores loginform, således at brugere kan tilgå systemet
const form = document.getElementById('loginform');
const username = document.getElementById('username')
const password = document.getElementById('password')
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

// nedestående eventListener igangsættes, når en bruger forsøger at logge ind
form.addEventListener('submit', function(e) {
    e.preventDefault()

    // vi henter værdien fra inputfelterne, som bruges til at logge ind
    let username1 = document.getElementById('username').value
    let password1 = document.getElementById('password').value

    fetch(`http://localhost:7071/api/login?username=${username1}&password=${password1}`)
        .then((resp) => resp.json()
        )
        // hvis det er en succes, sættes en JWT og brugeren tilgår homepage
        .then(function(data) {
            console.log(data);
            if(data.message != null){
                alert('Either username or password is incorrect.')
            } else {
            localStorage.setItem("JWT", data);
            location.href = '../Frontend_HTML/Homepage.html';
            }
        })
        // er det en fejl, kastes nedenstående fejlbesked
        .catch(function(err){
            console.log(err)
            alert('Something went wrong.')
        })
})

/* //Denne post method vil senere skulle bruges når login siden loader for at se om brugeren allerede bør været logget ind, i så fald redirect dem til homepage
fetch('http://localhost:7071/api/login', { 
        method: 'POST',
            body: JSON.stringify({
                
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
*/

/*var form = document.getElementById('loginform');

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let username = document.getElementById('username')
    let password = document.getElementById('password')
    loginuser()
})


function loginuser(){
    fetch('http://localhost:7071/api/login', {
        method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
})
console.log("test")}*/