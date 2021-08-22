<template>
  <form>
            <label for="email">Email : </label>
            <input type="email" name="email" id="emailInput" required>
            <label for="name">Name :</label>
            <input type="text" maxlength="20" name="name" id ="nameInput" required>
            <label for="firstName">First Name :</label>
            <input type="text" maxlength="20" name="name" id ="firstNameInput" required>
            <label for="password">Password :</label>
            <input type="password" minlength="9" maxlength="20" name="password" id="passwordInput" required>
          </form>
</template>

<script>
  
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
