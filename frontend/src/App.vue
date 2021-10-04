<template>
  <router-view />
</template>

<style lang="scss">
html{
  height : 100%;
}
body{
  height : 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color : #aeaeb2;
  min-height : 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>

export default ({
  name : 'app',
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
                categories.push(valuesBody[i]);
            }
       })
       .then(() =>{
          this.$store.state.categories = categories;
          this.$store.state.user.user = localStorage.getItem("user");
          this.$store.state.user.grade = localStorage.getItem("grade");
       }
       )
   }
})
</script>



