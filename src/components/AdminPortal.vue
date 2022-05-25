<template>
  <div>
    <navigation />
    <div class="flex">
      <input class="ml-8 sm:ml-auto mr-8 mt-4 w-full sm:w-auto" placeholder="Search" type="text" v-model="search" @input="searchList" />
    </div>
    <div class="p-4 sm:p-8 relative">
      <vuetable ref="requestTable" :apiMode="false" :data="filtered" :fields="getFields" row-class="hover:bg-gray-50 cursor-pointer" @vuetable:row-clicked="toDetails">
        <template slot="issue" slot-scope="item">
          <span class="whitespace-nowrap">{{ item.rowData.issue.title }}</span>
        </template>

        <template slot="status" slot-scope="item">
          <status-item :status="item.rowData.status" />
        </template>

        <template slot="actions" slot-scope="item">
          <div class="flex gap-2">
            <button
              :disabled="item.rowData.status === 'canceled' || item.rowData.status === 'completed'"
              @click.stop.prevent="setStatus(item.rowData, 'canceled')"
              class="btn canceled bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              Cancel
            </button>

            <button
              :disabled="item.rowData.status === 'confirmed' || item.rowData.status === 'canceled' || item.rowData.status === 'completed'"
              @click.stop.prevent="setStatus(item.rowData, 'confirmed')"
              class="btn confirmed bg-teal-600 hover:bg-teal-700 text-white text-sm"
            >
              Confirm
            </button>

            <button
              :disabled="item.rowData.status === 'completed' || item.rowData.status === 'canceled'"
              @click.stop.prevent="setStatus(item.rowData, 'completed')"
              class="btn completed bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              Completed
            </button>
          </div>
        </template>
      </vuetable>
    </div>
    <router-link
      class="w-14 h-14 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 ease-in-out fixed bottom-4 right-4 grid place-items-center"
      :to="{ name: 'AdminChat' }"
    >
      <span class="fas fa-comments text-xl"></span>
      <span v-if="count > 0" class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-center text-sm">{{ count }}</span>
    </router-link>
  </div>
</template>

<script>
import { getAllRequestList, setRequestStatus } from "@/api/requsetForm";
import moment from "moment";

import Navigation from "./Navigation.vue";
import Vuetable from "./VueTable/Vuetable.vue";
import StatusItem from "./StatusItem.vue";
import { getAdminAllCount, writeAdminChat } from "@/api/chat";

export default {
  name: "MyRequests",

  components: { Navigation, Vuetable, StatusItem },

  mounted() {
    getAllRequestList(this.getList);
    getAdminAllCount((data) => (this.count = data));
  },

  computed: {
    getFields() {
      return [
        {
          name: "author",
        },
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

        {
          name: "actions",
        },
      ];
    },
  },

  data() {
    return {
      count: 0,
      list: [],
      filtered: [],
      search: "",
    };
  },

  methods: {
    getList(data) {
      this.list = data;
      this.filtered = data;
      console.log(data);
    },

    //Searching and filtering data

    searchList(e) {
      this.search = e.target.value;
      this.filtered = this.list.filter(
        (item) =>
          item.author.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) ||
          item.make.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) ||
          item.status.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
    },

    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },

    setStatus(item, status) {
      setRequestStatus(item, status, (data) => console.log(data));
      this.$swal.fire({
        icon: "success",
        title: "Status Updated",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      switch (status) {
        case "confirmed":
          writeAdminChat(item.uid, "Your request is confirmed!", () => {});
          break;

        case "canceled":
          writeAdminChat(item.uid, "Unfortunately your request has not been accepted. Sorry for the inconvenience!", () => {});
          break;

        case "completed":
          writeAdminChat(
            item.uid,
            `Your work has been completed successfully! </br>Thanks for choosing us! </br></br></br>User ID: ${item.uid} </br>Request ID: ${item.id} </br>Author: ${item.author} </br>Make: ${item.make} </br>Model: ${item.model} </br>Year: ${item.year} </br>Issue: ${item.issue.title} </br>Price: ${item.price} </br>Status: ${item.status}`,
            () => {}
          );
          break;
      }
    },

    toDetails({ data }) {
      this.$router.push(`/request-details?uid=${data.uid}&id=${data.id}`);
    },
  },
};
</script>

