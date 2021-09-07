<template>
    <div class="articlePlace" id="articlePlace">
        
    </div>
</template>

<script>

export default({
    name: "articlePlace",
    mounted : function(){
        fetch('http://localhost:3000/api/article/getAllArticle')
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .then(function(allArticles){
            for(let i in allArticles){
                let article = allArticles[i][0];
                console.log(article);
                document.getElementById('articlePlace').innerHTML= "<div class='articlePlace__post'>" + 
                "<p>Votre ami "+ article.firstname + " " + article.lastname + "a publié une image</p>" + // TODO click droit sur l'user
                "<img href='" + article.url + "' alt='Image publiée'>" + 
                "</div>";
            }
        })
        .catch(function(err){
            console.log(err);
        }
        )}
})
</script>
