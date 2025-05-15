<template>
  <div class="app">
      <the-navbar></the-navbar>
        <div class="container">
          <div class="app-wrapper">
            <router-view>
            </router-view>
          </div>
      </div>
    </div>
</template>

<script>


import TheNavbar from "@/components/TheNavbar.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
  }
}
</script>

<style>



</style>
