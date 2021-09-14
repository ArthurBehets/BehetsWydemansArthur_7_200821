<template>
    <div class="articlePlace" id="articlePlace">
        
    </div>
</template>

<script>

export default({
    name: "articlePlace",
    methods:{
        getOneArticle : function(articleId){
            fetch('http://localhost:3000/api/article/getOneArticle/' + articleId)
            .then(function(res){
                if(res.ok){
                    return res.json();
                }
            })
            .then(function(oneArticle){
                console.log(oneArticle)
            })
        }
    }, 
    mounted : function(){
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
                console.log(article.articleId);
                document.getElementById('articlePlace').innerHTML += "<div class='articlePlace__post'>" + 
                "<p>Votre ami "+ article.firstname + " " + article.lastname + " a publié une <a v-on:click='getOneArticle('1')'>image</a></p>" + // TODO click droit sur l'user
                "<a v-on:click='getOneArticle('1')'><img href='" + article.url + "' alt='Image publiée'><a>" + 
                "</div>";
            }
        })
        .catch(function(err){
            console.log(err);
        }
        )}      
})
</script>
