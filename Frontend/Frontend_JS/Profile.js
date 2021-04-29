let jwt = localStorage.getItem("JWT");


let getButton = document.getElementById("getuser");

getButton.addEventListener("click", function(){

    fetch(`http://localhost:7071/api/profile?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data)
            document.getElementById("username").innerHTML = data[1].value
            /*
            document.getElementById("email").innerHTML = data[2].value
            document.getElementById("firstname").innerHTML = data[3].value
            document.getElementById("lastname").innerHTML = data[4].value
            document.getElementById("dob").innerHTML = data[5].value
            document.getElementById("gender").innerHTML = data[6].value
            document.getElementById("bio").innerHTML = data[7].value*/
        })
        .catch(function(err){
            console.log(err)
        })
})