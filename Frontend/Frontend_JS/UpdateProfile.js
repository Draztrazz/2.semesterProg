let jwt = localStorage.getItem("JWT");


window.addEventListener('load', () => {
    fetch(`http://localhost:7071/api/homepage?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data);
            document.getElementById("username").innerHTML = data[1].value
            document.getElementById("email").innerHTML = data[4].value
            document.getElementById("firstname").innerHTML = data[5].value
            document.getElementById("lastname").innerHTML = data[6].value
            document.getElementById("dob").innerHTML = data[8].value
            document.getElementById("gender").innerHTML = data[7].value
            document.getElementById("bio").innerHTML = data[9].value
        })
        .catch(function(err){
            console.log(err)
            location.href = '../Frontend_HTML/Frontpage.html'
        })
})


let updateButton = document.getElementById("updateuser");

updateButton.addEventListener("click", function(){

    fetch(`http://localhost:7071/api/profile?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data)
            document.getElementById("username").innerHTML = data[1].value
            document.getElementById("email").innerHTML = data[4].value
            document.getElementById("firstname").innerHTML = data[5].value
            document.getElementById("lastname").innerHTML = data[6].value
            document.getElementById("dob").innerHTML = data[8].value
            document.getElementById("gender").innerHTML = data[7].value
            document.getElementById("bio").innerHTML = data[9].value
        })
        .catch(function(err){
            console.log(err)
            location.href = '../Frontend_HTML/Frontpage.html'
        })
})

