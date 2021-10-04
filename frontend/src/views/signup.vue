<template>
  <div class="signup">
     <div class="signup__content">
        <navigationLogSign class="signup__content-nav"/>
        <signupForm class="signup__content-form"/>
     </div>
     <logo />
     <div id="login__alert" class="alert"></div>
  </div>
</template>

<script>
import signupForm from '../components/connection/signupForm.vue'
import navigationLogSign from '../components/connection/navigationLogSign.vue'
import logo from '../components/connection/logo.vue'

export default {
  name: 'Signup',
  components: {
    signupForm, navigationLogSign, logo
  }
}

</script>

<style lang="scss">
$primary : #2c3e50;
$secondary : #aeaeb2;
$third : #fd2d01;
$fourth : #ffd7d7;

.signup{
    height : 100vh;
    display : flex;
    justify-content: space-between;
    &__content{
        padding-top : 40vh;
        width : 50%;
        flex-direction: column;
        display: flex;
        &__nav{
            height : 5%;
        }
        &__form{
            color : $primary;
        }
    } 
}
@media (max-width : 992px){
    .signup{
        flex-direction: column-reverse;
        justify-content:center;
        &__content{
            padding : 0;
            width : 100%;
        }
    }
}
@media (max-width : 768px){
      
}
@media (max-width : 576px){
      
}
</style>