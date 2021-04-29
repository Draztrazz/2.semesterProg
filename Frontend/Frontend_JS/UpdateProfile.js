let jwt = localStorage.getItem("JWT");


window.addEventListener("load", function(){

    fetch(`http://localhost:7071/api/profile?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
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


let updateButton = document.getElementById("updateuser");

updateButton.addEventListener("click", function(){

    fetch(`http://localhost:7071/api/profile`, {
        method: "PUT",
        body: JSON.stringify({
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
            location.href = '../Frontend_HTML/Profilepage.html'
        })
        .catch(function(err){
            console.log(err)
            location.href = '../Frontend_HTML/Frontpage.html'
        })
})

