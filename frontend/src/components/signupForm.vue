<template>
<form class="signupForm">
   <div class="signupForm__email">
       <input type="email" name="email" id="email" onblur="validateEmail()" placeholder="Email"  required>
   </div>
   <div class="signupForm__name">
       <div class="signupForm__name-surname">
           <input type="text" name="surname" onblur="validateName()" placeholder="Nom" required>
       </div>
       <div class="signupForm__name-firstname">
           <input type="text" name="firstname" onblur="validateName()" placeholder="Prénom" required>   
       </div>
   </div>
   <div class="signupForm__password">
       <div class="signupForm__password-first">
           <input name="password" type="password" onblur="validatePassword()" placeholder="Mot de passe" required>
       </div>
       <div class="signupForm__password-confirmation">
           <input name="confirmation" type="password" onblur="validatePassword()" placeholder="Confirmation" required>
       </div>
   </div>
   <button v-on:click="signup" class="signupForm__button">S'inscrire</button>
</form>
</template>

<script>
   export default ({
       name : "signupForm",
       methods: {

    signup: function(){
       console.log("ok");
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