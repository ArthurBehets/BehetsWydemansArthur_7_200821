<template>
    <form class="loginForm">
        <div class="loginForm__email">
            <input type="email" id="email" placeholder="Email" required>
        </div>
        <div class="loginForm__password">
            <input type="password" id="password" placeholder="Mot de passe" required>
        </div>
        <div>
            <button v-on:click="login()">Se connecter</button>
        </div>
    </form>
</template>

<script>
//import router from '../../router/index'

   export default ({
       name : "loginForm",
       methods :{
           login : async function(){
               let user = {
                    email : document.getElementById('email').value,
                    password : document.getElementById('password').value
                }
                let valide = false;
                await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({user})
                 })
                .then((res)=>{
                    if (res.ok){
                        valide = true;
                        return res.json();
                    }
                    else{
                        console.log('error');
                        let timeout = [];
                        document.getElementById("alert").innerHTML = "<div class ='alert-bad'><p>Les identifiants ne sont pas corrects.</p></div>";
                        timeout.push(setTimeout(function(){
                            document.getElementById("alert").innerHTML = "";
                        }, 5000));
                    }
                })
                .then((value)=>{
                    localStorage.setItem("user", value.userId);
                    localStorage.setItem("grade", value.grade);
                    localStorage.setItem("utoken", value.token);
                })
                .then(() =>{
                    this.$store.state.user.user = localStorage.getItem("user");
                    this.$store.state.user.grade = localStorage.getItem("grade");
                })
                .then(() =>{
                    if(valide){
                        this.relocation('home');
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
                
           },
           relocation(route){
               location = 'http://localhost:8080/#/' + route;
           }
       }
   })
</script>

<style lang="scss">
$primary : #2c3e50;
$secondary : #aeaeb2;
$third : #fd2d01;
$fourth : #ffd7d7;
.loginForm{
    display : flex;
    flex-direction: column;
    & div{
        margin-bottom : 5px;
        & button{
            background-color: $secondary;
            color : $primary;
            border :1px solid $primary;
            &:hover{
                background-color : $fourth;
                box-shadow : 1px 1px $primary;
            }
        }
    }
}
</style>

