const form = document.getElementById('loginform');
const username = document.getElementById('username')
const password = document.getElementById('password')

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let username1 = document.getElementById('username').value
    let password1 = document.getElementById('password').value

    fetch(`http://localhost:7071/api/login?username=${username1}&password=${password1}`)
        .then((resp) => resp.json()
            /*if(response.status !==  200){
                console.log("Something went wrong" + response.status)
                return
            }*/
        )
        .then(function(data) {
            console.log(data);
            localStorage.setItem("JWT", data);
            location.href = '../Frontend_HTML/Homepage.html';;
        })
        .catch(function(err){
            console.log(err)
            alert('Either username or password is incorrect.')
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