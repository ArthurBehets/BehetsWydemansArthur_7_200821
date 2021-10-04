<template>
    <div class="modifyArticle__form">
        <div class="articleWithFile">
            <h2>
                <p>Modifier l'article</p>
            </h2>
            <form class="form">
                <div class="form__legend">
                    <label for='legend'>Légende : </label>
                    <input type="text" id="legend" name="legend" required>
                </div>
                <div class="form__file">
                    <label for="file">Fichier : </label>
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