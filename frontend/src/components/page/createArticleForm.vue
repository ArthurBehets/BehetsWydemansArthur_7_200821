<template>
    <div class="createArticle__form">
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
                    <option value="other">Autre</option>
                </select>
            </div>
            <div class="form__button">
                <a v-on:click="createArticle()">Publier</a>
            </div>
        </form>
    </div>
</template>

<script>

export default({
    name :"createArticleForm",
    mounted: function(){
       fetch('http://localhost:3000/api/article/getAllCategories', {'headers' : {
            'authorization':  localStorage.getItem('utoken')
        }})
       .then(function(res){
           if(res.ok){
               return res.json();
           }
       })
       .then(function(values){
           let valuesBody = values.results;
           console.log(values.results);
           for (let i in valuesBody){
               document.getElementById("categoryList").innerHTML += "<option value='" + valuesBody[i].categoryId + "'>" + valuesBody[i].categoryName + "</option>"
           }
       })
   },
    methods :{
        createArticle : function(){
            let newArticle = new FormData();
            newArticle.append("file", document.getElementById("file").files[0]);
            newArticle.append("userId", localStorage.getItem("user"));
            newArticle.append("categoryId", document.getElementById("categoryList").value);
            newArticle.append("legend", document.getElementById("legend").value);
            console.log(newArticle.file);
            fetch("http://localhost:3000/api/article/createArticle", {
                    method: "POST",
                    body : newArticle,
                    'headers' : {'authorization':  localStorage.getItem('utoken')}
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
</style>
