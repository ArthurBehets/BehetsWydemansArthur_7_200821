<template>
   <div class="selectCategory">
        <ul id="categoryChoices" class="categoryChoices">
            <li class="categoryChoices-title">Categories</li>
            <li><a class="categoryChoices-li-a" v-on:click="getAllArticle()">Tous</a></li>
            <li v-for="category in  $store.state.categories " :key="category">
                <a v-on:click='getOneCategory(category.categoryName)' class="categoryChoices-li-a">
                    {{ category.categoryName }} 
                </a>
            </li>
        </ul>
   </div>
</template>

<script>
export default ({
   name: "selectCategory",
   
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
                for(let i in values.results){
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
            for(let i in allArticles.results){
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
        margin-top : 10px;
        & a{
            color : black;
            text-decoration: none;
            &:hover{
                color : #fd2d01;
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
