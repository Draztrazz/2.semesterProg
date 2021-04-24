var form = document.getElementById('loginform');

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
console.log("test")}