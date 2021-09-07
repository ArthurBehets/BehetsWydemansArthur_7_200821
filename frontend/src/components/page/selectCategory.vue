<template>
   <div class="selectCategory">
        <ul id="categoryChoices">
            <li>category</li>
            <li>category</li>
            <li>category</li>
            <li>category</li>
        </ul>
   </div>
</template>

<script>
export default ({
   name: "selectCategory",
   mounted: function(){
       console.log("category charged");
   }
})
</script>

<style lang="scss">
ul li{
    list-style: none;
}
</style>
