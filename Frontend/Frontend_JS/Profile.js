let jwt = localStorage.getItem("JWT");


let getButton = document.getElementById("getuser");

getButton.addEventListener("click", function(){

    fetch(`http://localhost:7071/api/profile?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data)
            document.getElementById("username").innerHTML = data[1].value
            document.getElementById("email").innerHTML = data[4].value
            document.getElementById("firstname").innerHTML = data[5].value
            document.getElementById("lastname").innerHTML = data[6].value
            document.getElementById("dob").innerHTML = data[8].value
            document.getElementById("gender").innerHTML = data[7].value
            document.getElementById("bio").innerHTML = data[9].value
        })
        .catch(function(err){
            console.log(err)
        })
})

let deleteButton = document.getElementById("deleteuser");

deleteButton.addEventListener("click", function(){

        var txt;
        var deleteUserBox = prompt("Please enter DELETE to delete your profile:",);
        if (deleteUserBox == null || deleteUserBox == "") {
            txt = "You have not deleted your profile";
        } else if(deleteUserBox == "DELETE") {
            fetch(`http://localhost:7071/api/profile`, {
                method: "DELETE",
                body: JSON.stringify(jwt),
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                }
            })
            .then((resp) => resp.json()
            )
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