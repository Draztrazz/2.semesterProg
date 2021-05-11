let matchedUser = localStorage.getItem("viewedMatch");
let jwt = localStorage.getItem("JWT");


fetch(`http://localhost:7071/api/homepage?id=${jwt}`)
    .then((resp) => resp.json()
    )
    .then(function(data) {
        console.log(data);
        if(data.message != null){
            location.href = '../Frontend_HTML/Frontpage.html'
        } else {
            return false
        }
    })
    .catch(function(err){
        console.log(err)
        location.href = '../Frontend_HTML/Frontpage.html'
    });


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
        localStorage.removeItem('viewedMatch')
    })
    .catch(function(err){
        console.log(err)
    })