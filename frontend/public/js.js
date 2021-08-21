function signup(){
    let user = {
        email : "test1@gmail.com",
        nom : "NOM",
        prenom : "PRENOM",
        password : "PASSWORD"
    }
    fetch("http://localhost:3000/api/auth/signup", {
	method: "POST",
	headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
	body: JSON.stringify({user})
    })
}