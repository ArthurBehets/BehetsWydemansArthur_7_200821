<template>
  <div class="signup">
    <navigationLogSign />
    <signupForm />
  </div>
</template>

<script>
import signupForm from '../components/signupForm.vue'
import navigationLogSign from '../components/navigationLogSign.vue'

export default {
  name: 'Signup',
  components: {
    signupForm, navigationLogSign
  }
}
</script>