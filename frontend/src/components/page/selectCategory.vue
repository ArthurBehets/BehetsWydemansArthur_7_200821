<template>
   <div class="selectCategory">
        <ul id="categoryChoices" class="categoryChoices">
            <li class="categoryChoices-title">Categories</li>
            <li><a v-on:click="getAllArticle()">Tous</a></li>
            <li v-for="category in  $store.state.categories " :key="category"><a v-on:click='getOneCategory(category)'> {{ category }} </a></li>
        </ul>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default ({
   name: "selectCategory",
   computed: {
        ...mapState(['count'])
    },
   mounted: function(){
       let categories =[];
       fetch('http://localhost:3000/api/article/getAllCategories')
       .then(function(res){
           if(res.ok){
               return res.json();
           }
       })
       .then(function(values){
           let valuesBody = values.results;
           console.log(valuesBody);
           for (let i in valuesBody){
                categories.push(valuesBody[i].categoryName);
            }
       })
       .then(() =>{
          this.$store.state.categories = categories; 
       }
       )
   },
   methods :{
       getOneCategory(categoryId){
           console.log(categoryId);
           fetch("http://localhost:3000/api/article/getOneCategory/" + categoryId)
           .then(function(res){
               if(res.ok){
                   return res.json();
               }
           })
           .then(function(values){
               document.getElementById('articlePlace').innerHTML = "";
               console.log(values);
           })
       },
       getAllArticle(){
           fetch('http://localhost:3000/api/article/getAllArticle')
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .then(function(allArticles){
            let modifyArticle;
            let grade = localStorage.getItem("grade");
            if(grade=== "admin"){
                modifyArticle = "<div>I'm an admin</div>";
            }
            if(grade=== "user"){
                modifyArticle = "<div>I'm an user</div>";
            }
            console.log(modifyArticle);
            for(let i in allArticles.results){ //TODO image est un lien vers "getOne"
                let article = allArticles.results[i];
                console.log(article.url);
                document.getElementById('articlePlace').innerHTML += "<div class='articlePlace__post'>" + 
                "<p>Votre ami "+ article.firstname + " " + article.lastname + " a publié une <a v-on:click='getOneArticle('1')'>image</a></p>" + // TODO click droit sur l'user
                "<a v-on:click='getOneArticle('1')'><img class='articlePlace__post-img' src='" + article.url + "' alt='Image publiée'><a>" + 
                "</div>";
            }
        })
        .catch(function(err){
            console.log(err);
        }
        )
       }
   } 
})
</script>

<style lang="scss">
.categoryChoices{
    & li{
        list-style: none;
    }
    &-title{
        font-weight : bold;
    }
}
@media (max-width : 576px){
    ul li{
        width : 25%;
    }
}
</style>
