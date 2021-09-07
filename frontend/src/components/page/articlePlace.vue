<template>
    <div class="articlePlace" id="articlePlace">
        <p>OK</p>
    </div>
</template>

<script>

export default({
    name: "articlePlace",
    mounted : function(){
        fetch('http://localhost:3000/api/article/getAllArticle')
        .then(function(allArticle){
            for(let i in allArticle){
                console.log(allArticle[i]);
            }
        })
    }
})
</script>
