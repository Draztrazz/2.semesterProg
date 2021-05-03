let jwt = localStorage.getItem("JWT");
// her bruges en window.addEventListener til at loade indholdet for frontpage
// vi tjekker endvidere jwt-tokens for at vurdere om en bruger er logget ind på siden
// dermed kan vi tillade at en bruger kan forblive logget ind
window.addEventListener('load', () => {
    fetch(`http://localhost:7071/api/homepage?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            // hvis der findes en eksisterende jwt-token, er forbrugeren logget ind og redirectes dermed til homepage for brugeren
            console.log(data);
            location.href = '../Frontend_HTML/Homepage.html'
        })
        .catch(function(err){
            console.log(err)
        })
})

