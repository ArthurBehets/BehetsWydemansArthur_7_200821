<template>
    <div class="articlePlace" id="articlePlace">
        <div v-for="article in $store.state.articles" :key="article"> 
            <div class='articlePlace__post'>
                <div v-if="article.userId == $store.state.user.user || $store.state.user.grade == 'admin'">
                    <a class="articlePlace__post-param">...</a>
                    <div class="articlePlace__post-param-hidden">
                        <ul>
                            <li><a v-on:click="modify(article.articleId)">Modifier l'article</a></li>
                            <li><a v-on:click="deleted(article.articleId)">Supprimer l'article</a></li>
                        </ul>
                    </div>
                </div>
                <p class='articlePlace__post-date'>Publié le {{ article.publicationDate }}.</p>
                <div class="articlePlace__post-legend">
                    <p class="articlePlace__post-legend-p">
                        {{ article.legend }}
                    </p>
                </div>
                <div v-if="article.url && article.url != 'null'">
                    <img class='articlePlace__post-img' :src= 'article.url' alt='Image publiée'>
                </div>
                <div class='articlePlace__post-buttons' v-if="$store.state.showComment[article.articleId] === true">
                    <div v-if="$store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === true" class='articlePlace__post-buttons-like'><button class='like button liked' v-on:click="like(article.articleId)"> {{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | <img class="checkmark" src="../../assets/checkmark.png"></button></div>
                    <div v-else-if="$store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === false || $store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === undefined" class='articlePlace__post-buttons-like'><button class='like button' v-on:click="like(article.articleId)"> {{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | Liker</button></div>
                    <button class='comment button' v-on:click="showComment(article.articleId)">Fermer les commentaires</button>
                </div>
                <div class='articlePlace__post-buttons' v-else-if="$store.state.showComment[article.articleId] === false">
                    <div v-if="$store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === true" class='articlePlace__post-buttons-like'><button class='like button liked' v-on:click="like(article.articleId)"> {{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | <img class="checkmark" src="../../assets/checkmark.png"></button></div>
                    <div v-else-if="$store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === false || $store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === undefined" class='articlePlace__post-buttons-like'><button class='like button' v-on:click="like(article.articleId)"> {{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | Liker</button></div>
                    <button class='comment button' v-on:click="showComment(article.articleId)">Afficher les commentaires</button>
                </div>
                <div class='articlePlace__post-buttons' v-else>
                    <div v-if="$store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === true" class='articlePlace__post-buttons-like'><button class='like button liked' v-on:click="like(article.articleId)"> {{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | <img class="checkmark" src="../../assets/checkmark.png"></button></div>
                    <div v-else-if="$store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === false || $store.state.liked['A' + article.articleId + 'U' + $store.state.user.user] === undefined" class='articlePlace__post-buttons-like'><button class='like button' v-on:click="like(article.articleId)"> {{ article.likes }} <img src="../../assets/heart-solid.svg" class="heart"> | Liker</button></div>
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
import router from '../../router/index'
export default({
    name: "articlePlace", 
    mounted : function(){
        this.getLikedArticles();
        this.getAllArticles();
    } ,
    methods : {
        getLikedArticles(){
            let allLiked = [];
            fetch('http://localhost:3000/api/article/getLikedArticles', {'headers' : {
                'authorization':  localStorage.getItem('utoken')
            }})
            .then(function(res){
                if(res.ok){
                    return res.json();
                }
            })
            .then(function(value){
                for(let i in value.results){ 
                    allLiked.push({'articleId' : value.results[i].articleId, 'userId' : value.results[i].userId});
                }
            })
            .then(() =>{
                let user;
                let article;
                for(let i in allLiked){
                    user = (allLiked[i].userId).toString();
                    article = (allLiked[i].articleId).toString();
                    let userarticle = ('A' + article + 'U' + user);
                    this.$store.state.liked[userarticle] = true;
                }
            })
            .catch(function(err){
                console.log(err);
            })
        },
        getAllArticles(){
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
        modify(articleId){
            console.log(articleId);
            this.$store.state.articleToModify = articleId;
            router.push('/modifyArticle');
        },
        deleted(articleId){
            if(confirm("Voulez vous vraiment supprimer ce poste?")){
                console.log(articleId);
                let deleteBody = new FormData();
                deleteBody.append('articleId', articleId);
                fetch('http://localhost:3000/api/article/deleteArticle', {
                        method: "POST",
                        body : deleteBody,
                        'headers' : {'authorization':  localStorage.getItem('utoken')}
                })
                .then(function(res){
                    if(res.ok){
                        return res.json();
                    }
                })
                .then(() =>{
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
                })
            }
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
        },
        like(articleId){
            let user = localStorage.getItem('user')
            let myBody = {};
            myBody.userId = user;
            myBody.articleId = articleId;
            if(this.$store.state.liked['A' + articleId + 'U' + user] == true){
                myBody.liked = true;
                fetch('http://localhost:3000/api/article/likeArticle', {
                    method: "POST",
                    headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'authorization':  localStorage.getItem('utoken') 
                    },
                    body: JSON.stringify({myBody})
                })
                .then(() =>{
                    this.$store.state.liked['A' + articleId + 'U' + user] = false;
                    this.getLikedArticles();
                    this.getAllArticles();
                })
                .catch(function(err){
                    console.log(err);
                })
            }
            else if(this.$store.state.liked['A' + articleId + 'U' + user] == false || this.$store.state.liked['A' + articleId + 'U' + user] == undefined){
                myBody.liked = false;
                fetch('http://localhost:3000/api/article/likeArticle', {
                    method: "POST",
                    headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    'authorization':  localStorage.getItem('utoken') 
                    },
                    body: JSON.stringify({myBody})
                })
                .then(() =>{
                    this.$store.state.liked['A' + articleId + 'U' + user] = true;
                    this.getAllArticles();
                })
                .catch(function(err){
                    console.log(err);
                })
            }
        }
    }      
})
</script>

<style lang="scss">
$primary : #2c3e50;
$secondary : #aeaeb2;
$third : #fd2d01;
$fourth : #ffd7d7;
.articlePlace{
    &__post{
        background-color : $primary;
        margin-bottom : 20px;
        border-radius : 40px;
        padding-top : 20px;
        padding-bottom: 20px;
        &-param{
            color : $third;
            position :relative;
            float : right;
            padding-right : 20px;
            text-decoration: none;
            &:hover{
                color : $primary;
                &  + .articlePlace__post-param-hidden{
                    display : block;
                }
            }
            &-hidden{
                color: $third ;
                display : none;
                position : absolute;
                left : 80%;
                float : right;
                &:hover{
                    display : block;
                }
                & ul{
                    list-style: none;
                }
            }
        }
        &-name{
            color : $third;
        }
        &-date{
            color : $third;
        }
        &-legend{
            padding-left: 40px;
            padding-right: 40px;
            &-p{
                color : $fourth;
                overflow: break-word;
            }
        }
        &-img{
            width : 60%;
        }
        &-buttons{
            width : 100%;
            display : flex;
            flex-direction: row;
            justify-content: center;
            &-like{
                background-color: red;
            }
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
                    background-color : $secondary;
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
                        word-break : break-word;
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
.liked{
    background-color : $fourth 
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