<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-md">
    <img class="rounded-t-lg w-full h-60 object-cover object-center" :src="require(`@/assets/${img}`)" alt="" />

    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ title }}
      </h5>

      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400" v-html="description"></p>
      <a class="text-sm text-blue-600 hover:underline font-medium" :href="`tel:${getPhone}`">Tel: {{ phone }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    title: String,
    description: String,
    phone: String,
  },

  computed: {
    getPhone() {
      return this.phone.replace(/\D/g, "");
    },
  },
};
</script>

<style>
</style>