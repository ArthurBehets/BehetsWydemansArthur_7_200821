<template>
    <form class="loginForm">
        <div class="loginForm__email">
            <input type="email" id="email" placeholder="Email" required>
        </div>
        <div class="loginForm__password">
            <input type="password" id="password" placeholder="Mot de passe" required>
        </div>
        <button v-on:click="login()">Se connecter</button>
    </form>
</template>

<script>
import router from '../../router/index'

   export default ({
       name : "loginForm",
       methods :{
           login : function(){
               let user={
                    email : document.getElementById('email').value,
                    password : document.getElementById('password').value
                }
                fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({user})
                })
                .then(function(res){
                    if (res.ok){
                        return res.json();
                    }
                })
                .then(function(value){
                    localStorage.setItem("user", value.userId);
                    localStorage.setItem("grade", value.grade);
                    localStorage.setItem("utoken", value.token);
                    router.push('/home');
                })
                .catch((error) => {
                    console.log(error)
                })
           }
       }
   })
</script>

