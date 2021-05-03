let jwt = localStorage.getItem("JWT");

window.addEventListener('load', () => {
var tag = document.createElement("p");
var text = document.createTextNode("Cool");
tag.appendChild(text);
var element = document.getElementById('container')
element.appendChild(tag);
})

    fetch(`http://localhost:7071/api/mymatch?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data);
        })
        .catch(function(err){
            console.log(err)
        })

