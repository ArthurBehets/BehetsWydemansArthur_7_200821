<template>
<form class="signupForm">
   <div class="signupForm__email">
       <input type="email" name="email" id="email" v-on:blur="validateEmail()" placeholder="Email"  required>
   </div>
   <div class="signupForm__name">
       <div class="signupForm__name-surname">
           <input type="text" name="surname" id="surname" v-on:blur="validateName()" placeholder="Nom" required>
       </div>
       <div class="signupForm__name-firstname">
           <input type="text" name="firstname" id="firstname" v-on:blur="validateName()" placeholder="Prénom" required>   
       </div>
   </div>
   <div class="signupForm__password">
       <div class="signupForm__password-first">
           <input name="password" type="password" id="password" v-on:blur="validatePassword()" placeholder="Mot de passe" required>
       </div>
       <div class="signupForm__password-confirmation">
           <input name="confirmation" type="password" v-on:blur="validatePassword()" placeholder="Confirmation" required>
       </div>
   </div>
   <button v-on:click="signup" class="signupForm__button">S'inscrire</button>
</form>
</template>

<script>
import router from '../../router/index'

   export default ({
       name : "signupForm",
       methods: {
            signup: function(){
                let user = {
                    email : document.getElementById("email").value,
                    surname : document.getElementById("surname").value,
                    firstname : document.getElementById("firstname").value,
                    password : document.getElementById("password").value
                }
                if(user.email && user.surname && user.firstname && user.password){
                    fetch("http://localhost:3000/api/auth/signup", {
                    method: "POST",
                    headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({user})
                })
                .then(function(){
                    router.push('/login');
                })
                .catch((error) => {
                    console.log(error)
                })
                }
                else{
                    //TODO alerte "renseigner tous les champs"
                }
                }
        }   
    })


</script>

<style lang="scss">
   .signupForm{
       width : 100%;
       &__email{
           width : 30%;
           margin-left: 35%;
           margin-bottom : 20px;
           & input{
               width : 100%;
           }
       }
       &__name{
           width : 30%;
           margin-left : 35%;
           display :flex;
           flex-direction: row;
           margin-bottom : 20px;
           justify-content: space-between;
           &-surname{
               width : 48%;
               & input{
               width : 100%;
               }
           }
           &-firstname{
               width : 48%;
               & input{
                   width : 100%;
               }
           }
       }
       &__password{
           width : 30%;
           margin-left : 35%;
           display :flex;
           flex-direction: row;
           margin-bottom : 20px;
           justify-content: space-between;
           &-first{
               width : 48%;
               & input{
                   width : 100%;
               }
           }
           &-confirmation{
               width : 48%;
               & input{
                   width : 100%;
               }
           }
       }
       &__button{
           margin-left : 35%;
       }
   }
</style>