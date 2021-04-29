let jwt = localStorage.getItem("JWT");

window.addEventListener('load', () => {
    fetch(`http://localhost:7071/api/homepage?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data);
        })
        .catch(function(err){
            console.log(err)
            location.href = '../Frontend_HTML/Frontpage.html'
        })
})
