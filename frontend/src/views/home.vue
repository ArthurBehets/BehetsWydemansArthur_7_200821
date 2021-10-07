<template>
    <div class="home">
        <navigationHome class="fixed-top" />
        <div class="main">
            <selectCategory />
            <articlePlace />
        </div>
    </div>
</template>

<script>
import navigationHome from '../components/page/navigationHome.vue'
import selectCategory from '../components/page/selectCategory.vue'
import articlePlace from '../components/page/articlePlace.vue'

export default({
    name:'home',
    components:{
        navigationHome, selectCategory, articlePlace
    }
})
</script>

<style lang="scss">
$primary : #2c3e50;
$secondary : #aeaeb2;
$third : #fd2d01;
$fourth : #ffd7d7;

.home{
    width: 100%;
    position: relative;
}
.main{
    padding-top : 120px;
    display: flex;
    flex-direction: row;
    margin-left : 10%;
    margin-right : 10%;
    padding-bottom : 40px;
    & .selectCategory{
        width : 15%;
        text-align: left;
        position: fixed;
        margin-top : 40px;
        font-size : larger;
    }
    & .articlePlace{
        width : 70%;
        margin-left : 30%;
    }
}
@media (max-width : 768px){
    .main{
        margin-left : 0;
        & .articlePlace{
            margin-left : 40%;
            width : 60%;
        } 
    } 
}
@media (max-width : 576px){
    .main{
        flex-direction: column;
        margin-top : 50px;
        padding-top : 80px;
        & .selectCategory{
            position : fixed;
            background-color: $secondary ;
            padding-top : 0px;
            margin : 0;
            width : 100%;
            top : 55px;
            & .categoryChoices{
                display: flex;
                flex-direction: row;
                width : 100%;
                flex-wrap : wrap;
                &-title{
                    display : none;
                }
            }
        }
        & .articlePlace{
            width : 100%;
            margin : 0;
            margin-top : 90px;
            padding-left : 10%;
            padding-right : 0;
        }
    }
}
</style>
