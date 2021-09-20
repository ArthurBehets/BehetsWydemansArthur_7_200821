<template>
    <nav class="navbar navbar-expand-md navbar-light bg-light mb-5">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex-column flex-md-row  homeNav" id="navbarSupportedContent">
                <router-link to="/home" class="text-decoration-none color-black homeNav__logo"><img src="../../assets/icon-left-font-monochrome-black.png" class="homeNav__logo-img"></router-link>
                <div class="flex-column flex-md-row homeNav__menu">
                    <router-link to="/createArticle" class="text-decoration-none">Ajouter une image</router-link>
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
        color : black;
        &:hover{
            color : gray;
        }
    }
    }
    &__logo{
        &-img{
        width : 200%;
        height : 80px;
        object-fit: cover;
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
            margin-left : 17%;
            margin-top : -20px;
        }
    }
}
@media (max-width : 576px){
    .homeNav{
        &__menu{
            margin-left : 17%;
        }
        &__logo{
            &-img{
                width : 170%;
                height : 80px;
            }
        }
    }
}
@media (max-width : 350px){
    .homeNav{
        &__menu{
            margin-left : 20%;
        }
        &__logo{
            &-img{
                width : 140%;
                height : 80px;
            }
        }
    }
}
</style>
