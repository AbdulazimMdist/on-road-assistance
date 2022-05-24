<template>
  <div>
    <home v-if="!$store.getters.isAdmin" />
    <admin-portal v-else />
  </div>
</template>

<script>
import Home from "@/components/Home.vue";
import AdminPortal from "@/components/AdminPortal.vue";
export default {
  components: { Home, AdminPortal },
};
</script>

<style>
</style>