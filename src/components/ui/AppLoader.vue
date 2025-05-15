<template>
  <div class="loader">
    <img :src="loader" alt="">
  </div>
</template>

<script>
import loader from "../../assets/spinning-dots.svg";
export default {
  data(){
    return {
      loader: loader
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.loader img {
  width:100px;
  height:100px;
}
</style>
