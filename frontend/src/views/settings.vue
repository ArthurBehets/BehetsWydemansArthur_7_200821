<template>
    <div>
        <navigationHome />
        <div class="settings">
            <a>Changer de nom</a><br>
            <a>Changer de mot de passe</a><br>
            <a>Changer d'email</a><br>
            <div v-if="$store.state.user.grade == 'admin'">
                <a  class="settings__link" v-on:click='addCategory()'>
                    Ajouter une catégorie d'article.
                </a>
                <input type="text" id="addingCategory" name="addingCategory">
            </div><br>
            <div v-if="$store.state.user.grade == 'admin'">
                <a  class="settings__link" v-on:click='deleteCategory()'>
                    Supprimer une catégorie d'article.
                </a>
                <select id="deleteCategory" name="deleteCategory">
                    <option v-for='category in $store.state.categories' :key="category" v-bind:value="category.categoryId">
                        {{ category.categoryName }} 
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import navigationHome from '../components/page/navigationHome.vue'
import router from '../router/index'
export default ({
    name:'settings',
    components:{navigationHome},
    methods : {
        addCategory(){
            let newCategory  = document.getElementById("addingCategory").value;
            console.log(newCategory);
            fetch("http://localhost:3000/api/article/addCategory/" + newCategory, {
                    method: "POST",
                    body : newCategory,
                    'headers' : {'authorization':  localStorage.getItem('utoken')}
            })
            .then(() =>{
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
                    router.push('/home')
                }
                )
            })
        },
        deleteCategory(){
            let deletedCategory = document.getElementById("deleteCategory").value;
            fetch("http://localhost:3000/api/article/deleteCategory/" + deletedCategory, {
                    method: "POST",
                    'headers' : {'authorization':  localStorage.getItem('utoken')}
            })
            .then(() =>{
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
                    router.push('/home')
                }
                )
            })
        }
    }
})
</script>

<style lang="scss">
.settings{
    display : flex;
    flex-direction: column;
    text-align: left;
    margin-left : 40%;
    font-size: larger;
    font-weight : bold;
    &__link{
        color : black;
        text-decoration: none;
        &:hover{
            color : #ffd7d7;
        }
    }
}
@media (max-width : 576px){
    .settings{
        margin-left : 5%;
    }
}
</style>
