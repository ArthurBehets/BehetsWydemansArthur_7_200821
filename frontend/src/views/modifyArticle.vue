<template>
    <div class="home">
        <navigationHome class="fixed-top" />
        <modifyArticleForm />
    </div>
</template>

<script>
import navigationHome from '../components/page/navigationHome.vue'
import modifyArticleForm from '../components/page/modifyArticleForm.vue'

export default({
    name:'home',
    components:{
        navigationHome, modifyArticleForm
    }
})
</script>