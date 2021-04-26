let jwt = localStorage.getItem("JWT");


let getButton = document.getElementById("getuser");

getButton.addEventListener("click", function(){
    console.log(JSON.stringify(jwt))

    fetch(`http://localhost:7071/api/profile?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data);
        })
        .catch(function(err){
            console.log(err)
        })
})