
let jwt = localStorage.getItem("JWT");

fetch(`http://localhost:7071/api/profile?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data);
        })
        .catch(function(err){
            console.log(err)
            alert('Either username or password is incorrect.')
        })