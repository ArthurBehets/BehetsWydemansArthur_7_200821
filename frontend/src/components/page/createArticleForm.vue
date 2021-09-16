<template>
    <div class="createArticle__form">
        <form>
            <input type="text" id="legend" required>
            <input type="file" id="file">
            <select id="categoryList">
                <option value="other">Autre</option>
            </select>
            <a v-on:click="createArticle()">GO</a>
        </form>
    </div>
</template>

<script>

export default({
    name :"createArticleForm",
    mounted: function(){
       fetch('http://localhost:3000/api/article/getAllCategories')
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
                    body : newArticle
            })
        }
    }
})
</script>
