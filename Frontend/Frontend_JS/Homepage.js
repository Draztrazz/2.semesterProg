let jwt = localStorage.getItem("JWT");

// ved hjælp af en nedenstående eventListener bruger vi en jwt til at identificere den bruger, der skal tilgå systemet
// hvia der er tale om en admin, vurderer vi om data[3] er true = hvis ja, redirectes brugeren til admin-siden
window.addEventListener('load', () => {
    fetch(`http://localhost:7071/api/homepage?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data);
            if(data[3].value == true){
                location.href = '../Frontend_HTML/Adminpage.html'
            } else {
                return false
            }
        })
        .catch(function(err){
            console.log(err)
            location.href = '../Frontend_HTML/Frontpage.html'
        })
})

// her henvises der til den knap, der skal logge brugeren ud af systemet
let updateButton = document.getElementById("logout");

// log out funktionen viser således, at vi fjerner den jwt-token, der anvendes til at tilgå systemet
// herefter redirectes brugeren til vores frontpage, hvor man kan logge ind eller oprette en ny bruger
updateButton.addEventListener("click", function(){
    localStorage.removeItem('JWT')
    location.href = '../Frontend_HTML/Frontpage.html'
})