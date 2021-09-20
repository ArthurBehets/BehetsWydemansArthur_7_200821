<template>
    <div class="home">
        <navigationHome />
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
.home{
    width: 100%;
}
.main{
    display: flex;
    flex-direction: row;
    margin-left : 10%;
    margin-right : 10%;
    & .selectCategory{
        width : 20%;
        text-align: left;
    }
    & .articlePlace{
        width : 80%;
    }
}
</style>
