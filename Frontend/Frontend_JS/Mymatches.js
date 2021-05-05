let jwt = localStorage.getItem("JWT");
//let matchedArray = [];

window.addEventListener('load', () => {
async function fetchAwait(){
await fetch(`http://localhost:7071/api/homepage?id=${jwt}`)
    .then((resp) => resp.json()
    )
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err){
        console.log(err)
        location.href = '../Frontend_HTML/Frontpage.html'
    });


await fetch(`http://localhost:7071/api/mymatch?id=${jwt}`)
    .then((resp) => resp.json()
    )
    .then(function(data) {
        for(let i=0; i<data.length;i++){
            var box = document.createElement('div');
            box.setAttribute('id', 'small-container');
            var tag = document.createElement('label');
            var text = document.createTextNode('Match:');
            tag.appendChild(text);
            var tag2 = document.createElement('p');
            var text2 = document.createTextNode(data[i].firstname +' '+ data[i].lastname);
            tag2.appendChild(text2);
            var button = document.createElement('button');
            var text3 = document.createTextNode('Delete');
            button.setAttribute('class', 'deleteMatch');
            button.setAttribute('type', 'button');
            button.setAttribute('value', data[i].id);
            button.appendChild(text3);
            var button2 = document.createElement('button');
            var text4 = document.createTextNode('View match');
            button2.setAttribute('class', 'viewMatch');
            button2.setAttribute('type', 'button');
            button2.setAttribute('value', data[i].id);
            button2.appendChild(text4);
            var element = document.getElementById('container');
            element.appendChild(box);
            box.appendChild(tag);
            box.appendChild(tag2);
            box.appendChild(button);
            box.appendChild(button2);
            //matchedArray.push(data[i].id);
        }
        deleteButton();
        viewButton();
    })
    .catch(function(err){
        console.log(err)
        alert("You've got no current matches.")
    })
}
fetchAwait();
})

function deleteButton(){
    let deleteMatchButton = document.getElementsByClassName("deleteMatch");
    for(let i = 0; i < deleteMatchButton.length; i++){
        deleteMatchButton[i].addEventListener("click", function(){
            if (confirm('Are you sure you want to delete this match?')) {
                fetch(`http://localhost:7071/api/mymatch`, {
                    method: "DELETE",
                    body: JSON.stringify({
                        id1: jwt,
                        id2: deleteMatchButton[i].value
                    }),
                    headers: {
                        "Content-Type": "application/json; charset-UTF-8"
                    }
                    })
                    .then((resp) => resp.json()
                    )
                    .then(function(data) {
                        console.log(data);
                        location.reload();
                    })
                    .catch(function(err){
                        console.log(err)
                    })
            } else {
                console.log('Match not deleted')
            }
        })
    };
}

function viewButton(){
    let viewButton = document.getElementsByClassName('viewMatch');
    for(let i = 0; i < viewButton.length; i++){
    viewButton[i].addEventListener('click', function(){
        localStorage.setItem('viewedMatch', viewButton[i].value)
        location.href = '../Frontend_HTML/Viewmatch.html'
        /*fetch(`http://localhost:7071/api/mymatch`, {
            method: "POST",
            body: JSON.stringify({id: jwt}),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
            })
            .then((resp) => resp.json()
            )
            .then(function(data) {
                console.log(data)
            })
            .catch(function(err){
                console.log(err)
            })*/
        })
    }
}