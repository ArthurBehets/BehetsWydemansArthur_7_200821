<template>
   <div class="selectCategory">
        <ul id="categoryChoices">
            <li><a>Tous</a></li>
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
       }
   }
})
</script>

<style lang="scss">
ul li{
    list-style: none;
}
</style>
