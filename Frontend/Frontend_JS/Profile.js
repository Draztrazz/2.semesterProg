let jwt = localStorage.getItem("JWT");

// her anvendes window.addEventListener således, at når siden loades, får brugeren vist sine informationer
// måden hvorpå dette sker er ved at identificere i databasen ved hjælp af det id, der er tilknyttet den pågældende jwt-token
window.addEventListener('load', ()=>{
    fetch(`http://localhost:7071/api/profile?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data)
            // vi anvender paragraphs i html, hvorfor innerHTML benyttes
            document.getElementById("username").innerHTML = data[1].value
            document.getElementById("email").innerHTML = data[4].value
            document.getElementById("firstname").innerHTML = data[5].value
            document.getElementById("lastname").innerHTML = data[6].value
            document.getElementById("dob").innerHTML = data[8].value.substring(0,10)
            document.getElementById("gender").innerHTML = data[7].value
            document.getElementById("bio").innerHTML = data[9].value
        })
        // hvis der sker en fejl, redirectes vi til frontpage
        .catch(function(err){
            console.log(err)
            location.href = '../Frontend_HTML/Frontpage.html'
        })
})
// nedenstående variable er koblet op til delete-knappen i html

let deleteButton = document.getElementById("deleteuser");
// ved hjælp af en knap kan vi igangsætte nedenstående addEventListener. Denne knap er identificeret ved hjælp af getElementById for at henvise til den rigtige HTML-knap
deleteButton.addEventListener("click", function(){

        var txt;
         // det ses, at funktionen virker ved at man skriver DELETE for at slette en bruger. Dette skal stå i en inputboks, der kommer frem, når man trykker på ovenstående knap
        var deleteUserBox = prompt("Please enter DELETE to delete your profile:",);
        // hvis der ikke er noget input eller lignende, sker der ikke noget - profilen slettes ikke
        if (deleteUserBox != "DELETE") {
            txt = "You have not deleted your profile";
            // hvis inputtet er rigtigt (DELETE), så igangsættes vores fetch, der sletter en bruger ud fra brugerid
        } else {
            fetch(`http://localhost:7071/api/profile`, {
                method: "DELETE",
                body: JSON.stringify({id: jwt}),
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                }
            })
            .then((resp) => resp.json()
            )
            // når en bruger slettes, returneres man til frontpage
            .then(function(data) {
                console.log(data)
                location.href = '../Frontend_HTML/Frontpage.html';
            })
            .catch(function(err){
                console.log(err)
            })
            
        }
        document.getElementById("notDeleted").innerHTML = txt;


})