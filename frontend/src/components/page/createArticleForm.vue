<template>
    <div class="createArticle__form">
        <div class="articleWithFile">
            <h2>
                <p>Ajouter une image</p>
            </h2>
            <form class="form">
                <div class="form__legend">
                    <label for='legend'>Légende : </label>
                    <input type="text" id="legendFile" name="legend" required>
                </div>
                <div class="form__file">
                    <label for="file">Fichier : </label>
                    <input type="file" id="file" name="file">
                </div>
                <div class="form__categoryList">
                    <label for="categoryList">Catégorie : </label>
                    <select id="categoryListFile" name="categoryList">
                        <option v-for='category in $store.state.categories' :key="category" v-bind:value="category.categoryId">
                            {{ category.categoryName }} 
                        </option>
                    </select>
                </div>
                <div class="form__button">
                    <a v-on:click="createArticle('file')">Publier</a>
                </div>
            </form>
        </div>
        <div class="articleWithoutFile">
            <h2>
                <p>Ajouter du texte</p>
            </h2>
            <form class="form">
                <div class="form__legend">
                    <label for='legend'>Légende : </label>
                    <input type="text" id="legendText" name="legend" required>
                </div>
                <div class="form__categoryList">
                    <label for="categoryList">Catégorie : </label>
                    <select id="categoryListText" name="categoryList">
                        <option v-for='category in $store.state.categories' :key="category" v-bind:value="category.categoryId">
                            {{ category.categoryName }} 
                        </option>
                    </select>
                </div>
                <div class="form__button">
                    <a v-on:click="createArticle('text')">Publier</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import router from '../../router/index'
export default({
    name :"createArticleForm",
    methods :{
        createArticle(type){
            let newArticle = new FormData();
            if(type == 'file'){
                newArticle.append("file", document.getElementById("file").files[0]);
                newArticle.append("userId", localStorage.getItem("user"));
                newArticle.append("categoryId", document.getElementById("categoryListFile").value);
                newArticle.append("legend", document.getElementById("legendFile").value);
            }
            if(type =='text'){
                newArticle.append("userId", localStorage.getItem("user"));
                newArticle.append("categoryId", document.getElementById("categoryListText").value);
                newArticle.append("legend", document.getElementById("legendText").value);
            }
            fetch("http://localhost:3000/api/article/createArticle", {
                    method: "POST",
                    body : newArticle,
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
.form{
    width : 40%;
    margin-left : 40%;
    &__legend{
        text-align: left;
        margin-bottom: 15px;
    }
    &__file{
        text-align: left;
        margin-bottom: 15px;
    }
    &__categoryList{
        text-align: left;
        margin-bottom: 15px;
    }
    &__button{
        text-decoration: none;
        text-align: center;
        border : 1px solid black;
        width : 15%;
        border-radius: 20px;
        &:hover{
            box-shadow: 0.5px 0.5px gray;
        }
    }
}

.articleWithFile{
    margin-top : 100px;
    padding-bottom : 50px;
    margin-bottom: 50px;
    border-bottom : 1px solid black;
}
</style>
