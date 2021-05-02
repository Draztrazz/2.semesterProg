let jwt = localStorage.getItem("JWT");

let showAllUsers = document.getElementById("showusers");

showAllUsers.addEventListener('click', () => {
    fetch(`http://localhost:7071/api/superior`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data)
            document.getElementById("userinfo").innerHTML = "The system currently has " + data[0].value + " users"
            console.log("You have succesfully retrieved all data")
            document.getElementById("matchinfo").innerHTML = "The system currently has " + data[1].value + " matches"
            console.log("You have succesfully retrieved all data") 
        })
        .catch(function(err){
            console.log(err)
        })
})