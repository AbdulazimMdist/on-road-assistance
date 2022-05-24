<template>
  <div>
    <navigation />
    <div class="p-4">
      <div class="grid max-w-2xl mx-auto w-full bg-white rounded">
        <div class="messages h-96 overflow-y-auto">
          <div :key="item.createdAt" v-for="item in list">
            <div v-if="item.role === 'admin'" class="flex m-2">
              <div class="w-10 h-10 bg-pink-600 rounded-full grid place-items-center text-white font-medium text-2xl m-2">A</div>
              <div class="grid my-2 bg-blue-100 p-2 rounded-md shadow-md">
                <p class="text-xs text-gray-400">Admin</p>
                <p class="break-words w-60 text-sm" v-html="item.message"></p>
                <p class="text-xs text-gray-400">
                  {{ formatDate(item.createdAt) }}
                </p>
              </div>
            </div>

            <div v-if="item.role === 'user'" class="flex justify-end m-2">
              <div class="grid my-2 bg-gray-50 p-2 rounded-md shadow-md">
                <p class="text-xs text-gray-400">{{ item.author }}</p>
                <p class="break-words w-60 text-sm">{{ item.message }}</p>
                <p class="text-xs text-gray-400">
                  {{ formatDate(item.createdAt) }}
                </p>
              </div>
              <div class="w-10 h-10 bg-blue-600 rounded-full grid place-items-center text-white font-medium text-2xl m-2">
                {{ item.author[0] }}
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t flex gap-2 items-center">
          <input @keyup.enter="write" v-model="message" type="text" placeholder="Type message" class="rounded-md border-gray-200 w-full" />
          <button @click="write" class="px-6 rounded-md transition ease-in-out duration-200 h-10 bg-blue-600 text-white hover:bg-blue-700">Send</button>
        </div>
      </div>
    </div>
    <router-link
      class="w-14 h-14 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 ease-in-out fixed bottom-4 left-4 grid place-items-center"
      :to="{ name: 'home' }"
    >
      <span class="fa fa-arrow-left text-xl"></span>
    </router-link>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { readChat, writeChat } from "../api/chat";
import moment from "moment";
export default {
  components: { Navigation },

  mounted() {
    this.read();
  },

  data() {
    return {
      message: "",
      list: [],
    };
  },

  methods: {
    write() {
      if (this.message.length) {
        writeChat(this.message, () => (this.message = ""));
      }
    },

    read() {
      readChat((data) => (this.list = data));
    },

    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
  },
};
</script>
