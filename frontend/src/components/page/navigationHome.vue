<template>
    <nav class="navigationHome">
        <router-link to="/home" class="text-decoration-none color-black">Accueil</router-link>
        <button v-on:click="deconnect()" class="btn-link border-0 bg-white text-decoration-none">Se déconnecter</button>
        <router-link to="/createArticle" class="text-decoration-none">Ajouter une image</router-link>
        <router-link to='/settings' class="text-decoration-none">Paramètres</router-link>
    </nav>
</template>

<script>
import router from '../../router/index'

export default({
    name:"navigationHome",
    methods:{
        deconnect: function(){
            router.push('/');
        }
    }
})
</script>

<style lang="scss">

</style>
