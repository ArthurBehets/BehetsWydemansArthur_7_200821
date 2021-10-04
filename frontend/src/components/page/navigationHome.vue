<template>
    <nav class="navbar-dark navbar navbar-expand-md mb-5">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex-column flex-md-row  homeNav" id="navbarSupportedContent">
                <router-link to="/home" class="text-decoration-none color-black homeNav__logo"><img src="../../assets/icon-above-fontless.png" class="homeNav__logo-img"></router-link>
                <div class="flex-column flex-md-row homeNav__menu">
                    <router-link to="/createArticle" class="text-decoration-none">Créer un poste</router-link>
                    <a v-on:click="deconnect()" class="btn-link border-0 text-decoration-none">Se déconnecter</a>
                    <router-link to='/settings' class="text-decoration-none">Paramètres</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import router from '../../router/index'

export default({
    name:"navigationHome",
    methods:{
        deconnect: function(){
            localStorage.clear();
            router.push('/');
        }
    }
})
</script>

<style lang="scss">
body{
    width : 100%;
}
.navbar{
    width : 100%;
    background-color : #2c3e50;
}
.homeNav{
    display : flex;
    justify-content: space-between;
    &__menu{
        display : flex;
        justify-content: space-between;
        width : 37%;
        margin-right : 5%;
        & a{
            font-size: large;
            color : #fd2d01;
        &:hover{
            color : #ffd7d7;
        }
    }
    }
    &__logo{
        &-img{
        width : 200%;
        height : 80px;
        object-fit: cover;
        margin-left : 50%;
    }
    }
}

@media (max-width : 992px){
    .homeNav{
        &__menu{
            width : 45%;
        }
    }
}
@media (max-width : 768px){
    .homeNav{
        &__menu{
            margin-left : 29%;
            
        }
    }
}
@media (max-width : 576px){
    .homeNav{
        &__menu{
            margin-left : 35%;
        }
        &__logo{
            &-img{
                width : 180%;
                height : 80px;
            }
        }
    }
}
@media (max-width : 350px){
    .homeNav{
        &__menu{
            margin-left : 38%;
        }
        &__logo{
            &-img{
                width : 150%;
                height : 80px;
            }
        }
    }
}
</style>
