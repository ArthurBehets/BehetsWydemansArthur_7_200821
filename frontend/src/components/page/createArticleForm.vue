<template>
    <div class="createArticle__form">
        <form>
            <input type="text" id="legend" required>
            <a v-on:click="createArticle()">GO</a>
        </form>
    </div>
</template>

<script>

export default({
    name :"createArticleForm",
    methods :{
        createArticle : function(){
            let newArticle = {
                userId : 1,
                categoryId : 1,
                url : "myUrl",
                legend : document.getElementById("legend").value
            }
            fetch("http://localhost:3000/api/article/createArticle", {
                    method: "POST",
                    headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                    },
                    body :JSON.stringify(newArticle)
            })
        }
    }
})


// new Date().toLocaleString()
</script>
