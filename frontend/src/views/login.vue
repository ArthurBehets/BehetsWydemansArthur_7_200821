<template>
    <div class="login">
        <navigationLogSign />
        <loginForm />
    </div>
</template>

<script>
import loginForm from '../components/connection/loginForm.vue'
import navigationLogSign from '../components/connection/navigationLogSign.vue'

export default({
    name : 'login',
    components: {loginForm, navigationLogSign}
})
</script>
