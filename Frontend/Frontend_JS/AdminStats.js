let jwt = localStorage.getItem("JWT");

// vi anvender getElementById for at henvise til den knap, der igangsætter vores nedenstående fetch funktion
let showAllStats = document.getElementById("showstats");

// dette er vores addEventListener, der igangsættes, når man trykker på knappen, som vi henviser til ovenfor
showAllStats.addEventListener('click', () => {
    fetch(`http://localhost:7071/api/superior`)
        .then((resp) => resp.json()
        )
        // hvis det er en succes, skal vi indsætte nedenstående i html-siden for AdminStats ved hjælp af innerHTML og paragraphs
        .then(function(data) {
            console.log(data)
            // dette henviser til den første kolonne i sql
            document.getElementById("userinfo").innerHTML = "The system currently has " + data[0].value + " users"
            console.log("You have succesfully retrieved all data")
            // dette henviser til den anden kolonne i sql
            document.getElementById("matchinfo").innerHTML = "The system currently has " + data[1].value + " matches"
            console.log("You have succesfully retrieved all data") 
        })
        .catch(function(err){
            console.log(err)
        })
})