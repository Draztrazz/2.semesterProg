let jwt = localStorage.getItem("JWT");

let showAllUsers = document.getElementById("showusers");

updateButton.addEventListener('click', () => {
    fetch(`http://localhost:7071/api/admin`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data)
            document.getElementById("userinfo").innerHTML = data
            console.log("You have succesfully retrieved all of the great users")
        })
        .catch(function(err){
            console.log(err)
        })
})