function signup(){
    let user = {
        email : document.getElementById("emailInput").value,
        name : document.getElementById("nameInput").value,
        firstName : document.getElementById("firstNameInput").value,
        password : document.getElementById("passwordInput").value
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
        login(user);
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
    .catch((error) => {
        console.log(error)
    })
}