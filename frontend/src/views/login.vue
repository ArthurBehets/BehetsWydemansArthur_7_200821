<template>
    <div class="login">
        <navigationLogSign />
        <loginForm />
    </div>
</template>

<script>
import loginForm from '../components/loginForm.vue'
import navigationLogSign from '../components/navigationLogSign.vue'

export default({
    name : 'login',
    components: {loginForm, navigationLogSign}
})
</script>
