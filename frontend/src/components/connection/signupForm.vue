<template>
<form class="signupForm">
   <div class="signupForm__email">
       <input type="email" name="email" id="email" v-on:blur="validateEmail()" placeholder="Email"  required>
   </div>
   <div class="signupForm__name">
       <div class="signupForm__name-surname">
           <input type="text" name="surname" id="lastname" v-on:blur="validateName()" placeholder="Nom" required>
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
           <input name="confirmation" type="password" v-on:blur="validateConfirmation()" placeholder="Confirmation" required>
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
                    lastname : document.getElementById("lastname").value,
                    firstname : document.getElementById("firstname").value,
                    password : document.getElementById("password").value
                }
                if(user.email && user.lastname && user.firstname && user.password){
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
            },
            validateEmail : function(){
                 var emailModel = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                 var email = document.getElementById('email').value;
                 if(emailModel.test(email)){
                     //
                 }
                 else{
                     document.getElementById("email").value = "";
                     // TODO introduire alerte
                 }
            },
            validateFirstname : function(){
                let name = document.getElementById('firstname').value;
                if (2 < name.length < 20){
                    //
                }
                else{
                   document.getElementById('firstname').value = ""; 
                }
            },
            validateLasttname : function(){
                let name = document.getElementById('lastname').value;
                if (2 <= name.length <= 20){
                    //
                }
                else{
                   document.getElementById('lastname').value = ""; 
                }
            },
            validatePassword : function(){
                let password = document.getElementById('password').value;
                if (9 <= password.length <= 20){
                    //
                }
                else{
                   document.getElementById('password').value = "";
                }
            }, 
            validateConfirmation : function(){
                let confirmation = document.getElementById('confirmation').value;
                let password = document.getElementById('password').value;
                if(confirmation === password){
                    //
                }
                else{
                    // TODO alert
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