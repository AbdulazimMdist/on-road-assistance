<template>
  <div class="font-medium text-white whitespace-nowrap badge" :class="getStatus.color">
    {{ getStatus.title }}
  </div>
</template>

<script>
export default {
  props: {
    status: String,
  },

  data() {
    return {
      color: null,
      title: null,
    };
  },

  computed: {
    getStatus() {
      let color, title;

      switch (this.status) {
        case "waiting":
          color = "bg-yellow-400";
          title = "Waiting";
          break;
        case "confirmed":
          color = "bg-teal-500";
          title = "Confirmed";
          break;
        case "canceled":
          color = "bg-red-600";
          title = "Canceled";
          break;
        case "completed":
          color = "bg-blue-600";
          title = "Completed";
          break;
      }

      return { color, title };
    },
  },
};
</script>

<style>
</style>