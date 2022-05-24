<template>
  <div>
    <navigation />
    <div class="p-4">
      <div class="relative flex justify-center">
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-200 ease-in-out"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="listShow" class="absolute left-0 w-full bg-white border-r top-14 md:relative md:top-0 md:w-80">
            <div class="grid divide-y">
              <router-link @click.native="hideList" :key="user.uid" v-for="user in userList" :to="`?uid=${user.uid}&fullName=${user.author}`" class="p-2 hover:bg-gray-50">
                <div class="flex items-center">
                  <div class="grid w-10 h-10 m-2 text-2xl font-medium text-white bg-pink-600 rounded-full place-items-center">
                    {{ user.author[0] }}
                  </div>
                  <p class="px-2">{{ user.author }}</p>
                  <p v-if="user.count" class="w-5 h-5 ml-auto text-sm text-center text-white bg-red-600 rounded-full">{{ user.count }}</p>
                </div>
              </router-link>
            </div>
          </div>
        </transition>

        <div class="grid w-full max-w-2xl bg-white">
          <div  class="flex items-center gap-4 p-2 border-b header">
            <Hamburger :show="listShow" @click="listShow = !listShow"/>

            <div v-if="userName" class="flex items-center">
              <div class="grid w-10 h-10 m-2 text-2xl font-medium text-white bg-pink-600 rounded-full place-items-center">
                {{ userName[0] }}
              </div>
              <p class="px-2">{{ userName }}</p>
            </div>
          </div>

          <div ref="messageBox" class="overflow-y-auto messages h-96">
            <div :key="item.createdAt" v-for="item in list">
              <div v-if="item.role === 'admin'" class="flex justify-end m-2">
                <div class="grid p-2 my-2 rounded-md shadow-md bg-gray-50">
                  <p class="text-xs text-gray-400">Admin</p>
                  <p class="text-sm break-words w-60" v-html="item.message"></p>
                  <p class="text-xs text-gray-400">
                    {{ formatDate(item.createdAt) }}
                  </p>
                </div>
                <div class="grid w-10 h-10 m-2 text-2xl font-medium text-white bg-blue-600 rounded-full place-items-center">A</div>
              </div>

              <div v-if="item.role === 'user'" class="flex m-2">
                <div class="grid flex-shrink-0 w-10 h-10 m-2 text-2xl font-medium text-white bg-pink-600 rounded-full place-items-center">
                  {{ item.author[0] }}
                </div>
                <div class="grid p-2 my-2 bg-blue-100 rounded-md shadow-md">
                  <p class="text-xs text-gray-400">{{ item.author }}</p>
                  <p class="text-sm break-words w-60">{{ item.message }}</p>
                  <p class="text-xs text-gray-400">
                    {{ formatDate(item.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center gap-2 p-4 border-t sm:flex-row">
            <input @keyup.enter="write" v-model="message" type="text" placeholder="Type message" class="w-full border-gray-200 rounded-md" />
            <button @click="write" class="w-full h-10 px-6 text-white transition duration-200 ease-in-out bg-blue-600 rounded-md sm:w-auto hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
    <router-link
      class="fixed grid text-white transition duration-200 ease-in-out bg-blue-600 rounded-full shadow-md w-14 h-14 hover:bg-blue-700 bottom-4 left-4 place-items-center"
      :to="{ name: 'home' }"
    >
      <span class="text-xl fa fa-arrow-left"></span>
    </router-link>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { readAdminChat, readUserList, writeAdminChat } from "@/api/chat";
import moment from "moment";
import Hamburger from "../components/Hamburger.vue";

export default {
  components: { Navigation, Hamburger },

  async mounted() {
    readUserList((data) => (this.userList = data));

    window.onresize = () => {
      if (window.innerWidth >= 768) {
        this.listShow = true;
      } else {
        this.listShow = false;
      }
    };

    if (window.innerWidth >= 768) {
      this.listShow = true;
    } else {
      this.listShow = false;
    }
  },

  data() {
    return {
      userId: null,
      userName: null,
      message: "",
      list: [],
      userList: [],
      listShow: false,
    };
  },

  methods: {
    write() {
      if (this.message.length) {
        writeAdminChat(this.userId, this.message, () => (this.message = ""));
        let height = this.$refs.messageBox.scrollHeight;
        this.$refs.messageBox.scrollTo(0, height);
      }
    },

    read(uid) {
      readAdminChat(uid, (data) => (this.list = data));
    },

    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },

    hideList(){
      if (window.innerWidth < 768) {
        this.listShow = false
      }
    }
  },

  watch: {
    "$route.query.uid": function (newValue) {
      this.userId = newValue;
      this.userName = this.$route.query.fullName;

      this.read(newValue);
    },
  },
};
</script>
