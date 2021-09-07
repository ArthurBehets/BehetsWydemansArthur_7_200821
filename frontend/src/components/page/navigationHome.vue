<template>
    <nav class="navigationHome">
        <router-link to="/home">Accueil</router-link>
        <button v-on:click="deconnect()">Se déconnecter</button>
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
