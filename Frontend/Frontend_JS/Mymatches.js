let jwt = localStorage.getItem("JWT");
let matchedArray = 0;

/*window.addEventListener('load', () => {
var box = document.createElement('div')
box.setAttribute('id', 'small-container')
var tag = document.createElement('label');
var text = document.createTextNode('Match:');
tag.appendChild(text);
var tag2 = document.createElement('p')
var text2 = document.createTextNode('Yup')
tag2.appendChild(text2)
var button = document.createElement('button')
var text3 = document.createTextNode('View match')
button.appendChild(text3)
var element = document.getElementById('container')
element.appendChild(box)
box.appendChild(tag);
box.appendChild(tag2)
box.appendChild(button)
})*/

    fetch(`http://localhost:7071/api/mymatch?id=${jwt}`)
        .then((resp) => resp.json()
        )
        .then(function(data) {
            console.log(data.length);
            for(let i=0; i<data.length;i++){
                var box = document.createElement('div')
                box.setAttribute('id', 'small-container')
                var tag = document.createElement('label');
                var text = document.createTextNode('Match:');
                tag.appendChild(text);
                var tag2 = document.createElement('p')
                var text2 = document.createTextNode(data[i].firstname +' '+ data[i].lastname)
                tag2.appendChild(text2)
                var button = document.createElement('button')
                var text3 = document.createTextNode('View match')
                button.appendChild(text3)
                var element = document.getElementById('container')
                element.appendChild(box)
                box.appendChild(tag);
                box.appendChild(tag2)
                box.appendChild(button)
            }
        })
        .catch(function(err){
            console.log(err)
        })

