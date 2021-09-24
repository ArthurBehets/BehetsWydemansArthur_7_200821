<template>
    <div class="articlePlace" id="articlePlace">
        <div v-for="article in $store.state.articles" :key="article"> 
            <div class='articlePlace__post'>
                <p class='articlePlace__post-p'>Votre ami {{ article.firstname }} {{ article.lastname }} a publié une image</p>
                <p class='articlePlace__post-date'>Publié le {{ article.publicationDate }}.</p>
                <img class='articlePlace__post-img' :src= 'article.url' alt='Image publiée'>
                <div class='articlePlace__post-buttons' v-if="$store.state.showComment[article.articleId] === true">
                    <button class='like button' v-on:click="like(article.articleId)"> {{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | Liker</button>
                    <button class='comment button' v-on:click="showComment(article.articleId)">Fermer les commentaires</button>
                </div>
                <div class='articlePlace__post-buttons' v-else-if="$store.state.showComment[article.articleId] === false">
                    <button class='like button' v-on:click="like(article.articleId)">{{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | Liker</button>
                    <button class='comment button' v-on:click="showComment(article.articleId)">Afficher les commentaires</button>
                </div>
                <div class='articlePlace__post-buttons' v-else>
                    <button class='like button' v-on:click="like(article.articleId)">{{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | Liker</button>
                    <button class='comment button' v-on:click="comment(article.articleId)">Afficher les commentaires</button>
                </div>
                <div v-if="$store.state.showComment[article.articleId] === true" class="articlePlace__post-comments">
                    <div v-bind:id=" 'comment' + article.articleId" v-for="comment in $store.state.comments[article.articleId]" :key="comment" class="articlePlace__post-comments-comment">
                        <div class="articlePlace__post-comments-comment-div">
                            <p class="names"> {{ comment.firstname }} {{ comment.lastname }} </p><p>{{ comment.message }}</p>
                        </div>
                    </div>
                    <div>
                        <input type ='text' v-bind:id="'newComment' + article.articleId" placeholder="Ajoutez un commentaire">
                        <button v-on:click="createComment(article.articleId)" class='button'><img src='../../assets/icon-fontless.png' class='button-image'></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default({
    name: "articlePlace", 
    mounted : function(){
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
    },
    methods : {
        comment(articleId){
            let storeComments = [];
            fetch('http://localhost:3000/api/comment/getArticleComment/' + articleId, {'headers' : {
            'authorization':  localStorage.getItem('utoken')
        }}) 
            .then(function(res){
                if (res.ok){
                    return res.json();
                }
            })
            .then(function(values){
                let comments = values.result;
                for(let i in comments){
                    storeComments.push(comments[i]);
                }
            })
            .then(() =>{
                this.$store.state.comments[articleId] = storeComments;
                this.$store.state.showComment[articleId] = true;
            })
        },
        showComment(articleId){
            if(this.$store.state.showComment[articleId] === false){
                this.$store.state.showComment[articleId] = true;
            }
            else if(this.$store.state.showComment[articleId] === true){
                this.$store.state.showComment[articleId] = false;
            }
        },
        createComment(articleId){
            let newComment = new FormData();
            newComment.append('message', document.getElementById("newComment" + articleId).value);
            newComment.append('userId', localStorage.getItem('user'));
            newComment.append('articleId', articleId);
            fetch('http://localhost:3000/api/comment/createComment', {
                    method: "POST",
                    body : newComment,
                    'headers' : {'authorization':  localStorage.getItem('utoken')}
            })
            .then(() => {
                this.comment(articleId);
                document.getElementById("newComment" + articleId).value = '';
            })
        }
    }      
})
</script>

<style lang="scss">
$primary : #ffd7d7;
$secondary : rgba(#fd2d01, 0.3);
.articlePlace{
    &__post{
        background-color : $primary;
        margin-bottom : 20px;
        border-radius : 40px;
        padding-top : 20px;
        padding-bottom: 20px;
        &-img{
            width : 60%;
        }
        &-p{
            font-size : large;
        }
        &-buttons{
            width : 100%;
        }
        &-comments{
            margin-top : 30px;
            background-color : $primary;
            border-radius : 40px;
            
            &-comment{
                display : flex;
                padding-left : 20px;
                padding-right : 20px;
                &-div{
                    display : inline-block;
                    flex-direction: column;
                    background-color : #fff3f3;
                    border-radius : 15px;
                    padding : 10px;
                    padding-right : 20px;
                    padding-left : 20px;
                    position : left;
                    overflow-wrap : break-word;
                    margin-bottom : 10px;
                    & p{
                        margin : 0;
                        text-align: left;
                        width : 100%;
                        overflow-wrap : break-word;
                    }
                }
            }
        }
    }
}
.heart{
    height : 15px;
}
.button{
    background-color: $secondary;
    &-image{
        width : 30px;
        height : 30px;
        object-fit: cover;
        }
}
.names{
    font-weight : bold;
}
@media (max-width : 992px){
    
}
@media (max-width : 768px){
    .articlePlace{
        &__post{
            &-img{
                width : 80%;
            }
        }
    }   
}
</style>