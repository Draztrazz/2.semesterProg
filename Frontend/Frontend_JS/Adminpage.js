let jwt = localStorage.getItem("JWT");

fetch(`http://localhost:7071/api/homepage?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data);
            if(data[3].value == true){
                return true
            } else if(data.message != null){
                location.href = '../Frontend_HTML/Frontpage.html'
            } else {
                location.href = '../Frontend_HTML/Homepage.html'
            }
        })
        .catch(function(err){
            console.log(err)
            location.href = '../Frontend_HTML/Frontpage.html'
        })