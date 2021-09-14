<template>
    <div>
        <navigationHome />
        <div class="settings">
            <a>Changer de nom</a><br>
            <a>Changer de mot de passe</a><br>
            <a>Changer d'email</a>
        </div>
    </div>
</template>

<script>
import navigationHome from '../components/page/navigationHome.vue'

export default ({
    name:'settings',
    components:{navigationHome}
})
</script>
