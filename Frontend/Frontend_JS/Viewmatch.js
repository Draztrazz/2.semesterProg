let matchedUser = localStorage.getItem("viewedMatch");

fetch(`http://localhost:7071/api/mymatch`, {
    method: "POST",
    body: JSON.stringify({
        id: matchedUser
    }),
    headers: {
        "Content-Type": "application/json; charset-UTF-8"
    }
    })
    .then((resp) => resp.json()
    )
    .then(function(data) {
        console.log(data)
        
        document.getElementById("firstname").innerHTML = data.firstname
        document.getElementById("lastname").innerHTML = data.lastname
        document.getElementById("age").innerHTML = data.age
        document.getElementById("gender").innerHTML = data.gender
        document.getElementById("bio").innerHTML = data.bio
        localStorage.clearItem('viewedMatch')
    })
    .catch(function(err){
        console.log(err)
    })