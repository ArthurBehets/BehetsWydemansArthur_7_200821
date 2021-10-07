<template>
    <div class="modifyArticle__form">
        <div class="articleWithFile">
            <h2>
                <p>Modifier l'article</p>
            </h2>
            <form class="form">
                <div class="form__legend">
                    <label for='legend'>Légende : </label>
                    <textarea id="legend" name="legend" required></textarea>
                </div>
                <div class="form__file">
                    <label for="file">Modifier le fichier : </label>
                    <input type="file" id="file" name="file">   
                </div>
                <div class="form__categoryList">
                    <label for="categoryList">Catégorie : </label>
                    <select id="categoryList" name="categoryList">
                        <option v-for='category in $store.state.categories' :key="category" v-bind:value="category.categoryId">
                            {{ category.categoryName }} 
                        </option>
                    </select>
                </div>
                <div class="form__button">
                    <a v-on:click="modifyArticle()">Publier</a>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import router from '../../router/index'
export default({
    name : 'modifyArticleForm',
    methods : {
        modifyArticle(){
            let modifiedArticle = new FormData();
            if(document.getElementById("file").files[0]){
                 modifiedArticle.append("file", document.getElementById("file").files[0]);
            }
            else{
                modifiedArticle.append('file', null);
            }
            modifiedArticle.append("articleId", this.$store.state.articleToModify);
            modifiedArticle.append("categoryId", document.getElementById("categoryList").value);
            modifiedArticle.append("legend", document.getElementById("legend").value);
            fetch("http://localhost:3000/api/article/modifyArticle", {
                    method: "POST",
                    body : modifiedArticle,
                    'headers' : {'authorization':  localStorage.getItem('utoken')}
            })
            .then(() =>{
                router.push('/home');
            })
        }
    }
})

</script>

<style lang="scss">
body{
    width : 100%;
}
.modifyArticle__form{
    padding-top : 50px;
    width : 100%;
}
.form__legend{
    & textarea{
        height : 30px;
        width : 40%;
        word-wrap : break-word;
    }
}
</style>