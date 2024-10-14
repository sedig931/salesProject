<template>
  <CartVue :id="this.id" />
  <!-- <h1>welcom home</h1> -->
</template>

<script>
import NavVue from "../navviews/nav.vue";
import CartVue from "./cart.vue";
export default {
  props: ["id"],
  name: "home",
  components: {
    CartVue,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>