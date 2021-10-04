<template>
    <div id="navigationLogSign" class="navigationLogSign">
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

<style lang="scss">
$primary : #2c3e50;
$secondary : #aeaeb2;
$third : #fd2d01;
$fourth : #ffd7d7;

.navigationLogSign{
  & a{
    text-decoration: none;
    color : $primary;
    &:hover{
      color : $fourth;
    }
  }
}
</style>