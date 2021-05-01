let jwt = localStorage.getItem("JWT");



window.addEventListener('load', ()=>{
    fetch(`http://localhost:7071/api/match?id=${jwt}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            }) .catch((err) =>{
                console.log(err)
            })
})