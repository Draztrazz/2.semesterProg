let jwt = localStorage.getItem("JWT");



window.addEventListener('load', ()=>{
    fetch('http://localhost:7071/api/match', {
        method: 'POST',
            body: JSON.stringify({
                id: jwt
            }),
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                }
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            }) .catch((err) =>{
                console.log(err)
            })
})