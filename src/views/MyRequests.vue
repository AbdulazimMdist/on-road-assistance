<template>
  <div>
    <navigation />

    <div class="flex">
      <input class="ml-8 sm:ml-auto mr-8 mt-4 w-full sm:w-auto" placeholder="Search" type="text" v-model="search" @input="searchList" />
    </div>

    <div class="p-4 sm:p-8 relative">
      <vuetable ref="requestTable" :apiMode="false" :data="filtered" :fields="getFields">
        <template slot="issue" slot-scope="item">
          <span class="whitespace-nowrap">{{ item.rowData.issue.title }}</span>
        </template>
        <template slot="location_type" slot-scope="item">
          <span class="whitespace-nowrap">{{ item.rowData.location_type }}</span>
        </template>

        <template slot="status" slot-scope="item">
          <status-item :status="item.rowData.status" />
        </template>
      </vuetable>
      <router-link
        class="w-14 h-14 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 ease-in-out fixed bottom-4 left-4 grid place-items-center"
        :to="{ name: 'home' }"
      >
        <span class="fa fa-arrow-left text-xl"></span>
      </router-link>
    </div>
  </div>
</template>


<script>
import Vuetable from "@/components/VueTable/Vuetable.vue";
import { getRequestList } from "@/api/requsetForm";
import StatusItem from "@/components/StatusItem.vue";
import Navigation from "@/components/Navigation.vue";
import moment from "moment";

export default {
  name: "MyRequests",
  components: { Vuetable, StatusItem, Navigation },

  mounted() {
    getRequestList(this.getList);
  },

  //table header titles
  computed: {
    getFields() {
      return [
        {
          name: "make",
        },
        {
          name: "model",
        },
        {
          name: "issue",
        },
        {
          name: "location_type",
          title: "Location Type",
        },

        {
          name: "price",
        },

        {
          name: "createdAt",
          title: "Requested Date",
          formatter: this.formatDate,
        },

        {
          name: "updatedAt",
          title: "Updated Date",
          formatter: this.formatDate,
        },
        {
          name: "status",
        },
      ];
    },
  },

  data() {
    return {
      list: [],
      filtered: [],
      search: "",
    };
  },

  methods: {
    getList(data) {
      this.list = Object.values(data);
      this.filtered = Object.values(data).reverse();
    },

    //Searching and filtering data

    searchList(e) {
      this.search = e.target.value;
      this.filtered = this.list.filter(
        (item) =>
          item.make.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) ||
          item.model.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) ||
          item.status.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
    },

    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
  },
};
</script>

<style>
</style>