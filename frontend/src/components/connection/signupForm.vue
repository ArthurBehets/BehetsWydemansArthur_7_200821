<template>
<div class="signupForm">
   <div class="signupForm__email">
       <input type="email" name="email" id="email" placeholder="Email"  required>
   </div>
   <div class="signupForm__name">
       <div class="signupForm__name-surname">
           <input type="text" name="surname" id="lastname" placeholder="Nom" required>
       </div>
       <div class="signupForm__name-firstname">
           <input type="text" name="firstname" id="firstname" placeholder="Prénom" required>   
       </div>
   </div>
   <div class="signupForm__password">
       <div class="signupForm__password-first">
           <input name="password" type="password" id="password" placeholder="Mot de passe" required>
       </div>
       <div class="signupForm__password-confirmation">
           <input name="confirmation" id="confirmation" type="password" placeholder="Confirmation" required>
       </div>
   </div>
   <button v-on:click="signup" class="signupForm__button">S'inscrire</button>
</div>
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
                    password : document.getElementById("password").value,
                    grade : "user"
                }
                if(user.email && user.lastname && user.firstname && user.password){
                    if(this.validateEmail() && this.validateLastname() && this.validateFirstname() && this.validatePassword() && this.validateConfirmation()){
                        console.log(user);
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
                }
                else{
                    let timeout = [];
                    document.getElementById("signup__alert").innerHTML = "<div class ='signup__alert-bad'><p>Veuillez renseigner tous les champs.</p></div>";
                    timeout.push(setTimeout(function(){
                        document.getElementById("signup__alert").innerHTML = "";
                    }, 5000));
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('lastname').value = '';
                    document.getElementById('firstname').value = '';
                }
            },
            validateEmail : function(){
                 var emailModel = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                 var email = document.getElementById('email').value;
                 if(emailModel.test(email)){
                     return true;
                 }
                 else{
                    let timeout = [];
                    document.getElementById("signup__alert").innerHTML = "<div class ='signup__alert-bad'><p>L'email n'est pas valide.</p></div>";
                    timeout.push(setTimeout(function(){
                        document.getElementById("signup__alert").innerHTML = "";
                    }, 5000));
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('lastname').value = '';
                    document.getElementById('firstname').value = '';
                    return false;
                 }
            },
            validateFirstname : function(){
                let name = document.getElementById('firstname').value;
                if (2 < name.length < 20){
                    return true;
                }
                else{
                   let timeout = [];
                    document.getElementById("signup__alert").innerHTML = "<div class ='signup__alert-bad'><p>Le prénom n'est pas valide.</p></div>";
                    timeout.push(setTimeout(function(){
                        document.getElementById("signup__alert").innerHTML = "";
                    }, 5000));
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('lastname').value = '';
                    document.getElementById('firstname').value = '';
                    return false; 
                }
            },
            validateLastname : function(){
                let name = document.getElementById('lastname').value;
                if (2 <= name.length <= 20){
                    return true;
                }
                else{
                   let timeout = [];
                    document.getElementById("signup__alert").innerHTML = "<div class ='signup__alert-bad'><p>Le nom n'est pas valide.</p></div>";
                    timeout.push(setTimeout(function(){
                        document.getElementById("signup__alert").innerHTML = "";
                    }, 5000));
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('lastname').value = '';
                    document.getElementById('firstname').value = '';
                    return false;
                }
            },
            validatePassword : function(){
                let password = document.getElementById('password').value;
                if (9 <= password.length <= 20){
                    return true;
                }
                else{
                   let timeout = [];
                    document.getElementById("signup__alert").innerHTML = "<div class ='signup__alert-bad'><p>Le mot de passe n'est pas valide.</p></div>";
                    timeout.push(setTimeout(function(){
                        document.getElementById("signup__alert").innerHTML = "";
                    }, 5000));
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('lastname').value = '';
                    document.getElementById('firstname').value = '';
                    return false;
                }
            }, 
            validateConfirmation : function(){
                let confirmation = document.getElementById('confirmation').value;
                let password = document.getElementById('password').value;
                if(confirmation === password){
                    return true;
                }
                else{
                    let timeout = [];
                    document.getElementById("signup__alert").innerHTML = "<div class ='signup__alert-bad'><p>Mot de passe mal confirmé.</p></div>";
                    timeout.push(setTimeout(function(){
                        document.getElementById("signup__alert").innerHTML = "";
                    }, 5000));
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('lastname').value = '';
                    document.getElementById('firstname').value = '';
                    return false;
                }
            }   
        }   
    })


</script>

<style lang="scss">
$primary : #2c3e50;
$secondary : #aeaeb2;
$third : #fd2d01;
$fourth : #ffd7d7;

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
               width : 100%;
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
            background-color: $secondary;
            color : $primary;
            border :1px solid $primary;
            &:hover{
                background-color : $fourth;
                box-shadow : 1px 1px $primary;
            }
       }
   }
@media (max-width : 768px){
    .signupForm{
        &__email{
            margin-bottom: 0;
        }
        &__name{
            margin-bottom: 0;
            flex-direction: column;
            &-surname{
                width : 100%;
                & input{
                width : 100%;
               }
            }
            &-firstname{
               width : 100%;
                & input{
                width : 100%;
               } 
            }
        }
        &__password{
           flex-direction: column;
           &-first{
               width : 100%;
               & input{
                   width : 100%;
               }
           }
           &-confirmation{
               width : 100%;
               & input{
                   width : 100%;
               }
           }
       }
    }
}
</style>