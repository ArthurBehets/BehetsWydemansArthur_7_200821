<template>
  <div class="signup">
    <navigationLogSign />
    <signupForm />
  </div>
</template>

<script>
import signupForm from '../components/connection/signupForm.vue'
import navigationLogSign from '../components/connection/navigationLogSign.vue'

export default {
  name: 'Signup',
  components: {
    signupForm, navigationLogSign
  }
}

</script>