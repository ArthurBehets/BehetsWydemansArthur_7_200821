<template>
    <div id="navigationLogSign">
    <router-link to="/">Signup</router-link> |
    <router-link to="/login">Login</router-link>
    <router-view />
  </div>
</template>

<script>

export default({
    name:"navigationLogSign"
})
</script>
