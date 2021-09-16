<template>
   <div class="selectCategory">
        <ul id="categoryChoices">
        </ul>
   </div>
</template>

<script>
export default ({
   name: "selectCategory",
   mounted: function(){
       fetch('http://localhost:3000/api/article/getAllCategories')
       .then(function(res){
           if(res.ok){
               return res.json();
           }
       })
       .then(function(values){
           let valuesBody = values.results;
           for (let i in valuesBody){
               document.getElementById("categoryChoices").innerHTML += "<li><a v-on:click='getOneCategory(" + valuesBody[i].categoryId + ")'>" + valuesBody[i].categoryName + "</a></li>"
           }
       })
   },
   methods :{
       getOneCategory : function(categoryId){
           console.log("ok");
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
       }
   }
})
</script>

<style lang="scss">
ul li{
    list-style: none;
}
</style>
