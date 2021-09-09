<template>
    <div>
        <navigationHome />
        <div class="createArticle">
            <createArticleForm />
        </div>
    </div>
</template>

<script>
import createArticleForm from '../components/page/createArticleForm'
import navigationHome from '../components/page/navigationHome.vue'

export default({
    name: 'createArticle',
    components :{
        createArticleForm, navigationHome
    }
})
</script>
