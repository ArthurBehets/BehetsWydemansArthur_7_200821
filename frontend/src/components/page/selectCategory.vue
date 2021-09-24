<template>
   <div class="selectCategory">
        <ul id="categoryChoices" class="categoryChoices">
            <li class="categoryChoices-title">Categories</li>
            <li><a class="categoryChoices-li-a" v-on:click="getAllArticle()">Tous</a></li>
            <li v-for="category in  $store.state.categories " :key="category"><a v-on:click='getOneCategory(category)' class="categoryChoices-li-a"> {{ category }} </a></li>
        </ul>
   </div>
</template>

<script>
export default ({
   name: "selectCategory",
   mounted: function(){
       let categories =[];
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
       getOneCategory(categoryName){
           let articles = [];
           fetch("http://localhost:3000/api/article/getOneCategory/" + categoryName, {'headers' : {
            'authorization':  localStorage.getItem('utoken')
        }})
           .then(function(res){
               if(res.ok){
                   return res.json();
               }
           })
           .then(function(values){
                let modifyArticle;
                let grade = localStorage.getItem("grade");
                if(grade=== "admin"){
                    modifyArticle = "<div>I'm an admin</div>";
                }
                if(grade=== "user"){
                    modifyArticle = "<div>I'm an user</div>";
                }
                console.log(modifyArticle);
                for(let i in values.results){ //TODO image est un lien vers "getOne"
                    let article = values.results[i];
                    articles.push(article);
                }
           })
           .then(() =>{
                this.$store.state.articles = articles;
       }
       )
       },
       getAllArticle(){
        let articles = [];
        fetch('http://localhost:3000/api/article/getAllArticle', {'headers' : {
            'authorization':  localStorage.getItem('utoken')
        }})
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
                articles.push(article);
            }
        })
        .catch(function(err){
            console.log(err);
        })
        .then(() =>{
                this.$store.state.articles = articles;
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
        & a{
            color : black;
            text-decoration: none;
            &:hover{
                color : rgba(#fd2d01, 0.8);
            }
        }
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
