<template>
    <div class="img"><img src="../../assets/icon-above-fontless.png"></div>
</template>

<script>
export default ({
    name : "logo"
})
</script>

<style lang="scss">

$primary : #2c3e50;
$secondary : #aeaeb2;
$third : #fd2d01;
$fourth : #ffd7d7;

.img{
    background-color: $primary;
    position: absolute;
    right : 0;
    height : 100vh;
    width : 50%;
    & img{
        object-fit: cover;
        margin-top : 20vh;
        height : 40vh;
        width : 90%;
    }
    &-alert{
        height : 10%;
        &-bad{
            background-color: $third;
            position: absolute;
            border-radius : 10px;
            padding : 15px;
            padding-bottom : 0px;
        }
    }
}
@media (max-width : 992px){
    .img{
        position: absolute;
        width : 100%;
        height : 40vh;
        top : 0;
        & img{
            height : 25vh;
            object-fit: cover;
            width : 50%;
            margin :7vh;
        }
    }
}
@media (max-width : 768px){
    .img{
        & img{
            width : 225px;
            height : 25vh;
        }
    }
}
@media (max-width : 576px){
      .img{
        height : 30vh;
        & img{
            width : 150px;
            height : 15vh;
        }
    }
}

</style>
