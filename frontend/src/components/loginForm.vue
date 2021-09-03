<template>
    <form class="loginForm">
        <div class="loginForm__email">
            <input type="email" id="email" placeholder="Email" required>
        </div>
        <div class="loginForm__password">
            <input type="password" id="password" placeholder="Mot de passe" required>
        </div>
        <button onclick="login()">Se connecter</button>
    </form>
</template>

<script>
   export default ({
       name : "loginForm"
   })
</script>

