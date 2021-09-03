function signup(){
    let user = {
        email : document.getElementById("email").value,
        name : document.getElementById("lastname").value,
        firstName : document.getElementById("firstName").value,
        password : document.getElementById("password").value
    }
    fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
	    body: JSON.stringify({user})
    })
    .then(function(){
        // Sécurité? mail...?
    })
    .catch((error) => {
        console.log(error)
    })
}



function login(user){
    fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
	    body: JSON.stringify({user})
    })
    .then(function(){
        // Rediriger vers site
    })
    .catch((error) => {
        console.log(error)
    })
}



