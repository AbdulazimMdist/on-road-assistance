<template>
  <nav class="sticky top-0 w-full bg-white border-gray-200 px-2 sm:px-4 py-2.5 shadow z-50">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">On Road Assistance</span>

      <dropdown placement="right" width="w-80">
        <!-- Button content -->
        <template v-slot:button>
          <div class="w-10 h-10 grid place-items-center bg-blue-600 rounded-full">
            <span class="text-white text-2xl font-medium">
              {{ $store.getters.getUser.displayName[0] }}
            </span>
          </div>
        </template>

        <!-- Opened dropdown content -->
        <template v-slot:content>
          <div class="flex gap-2 p-2 border-b">
            <div>
              <div class="w-10 h-10 grid place-items-center bg-blue-600 rounded-full">
                <span class="text-white text-2xl font-medium">
                  {{ $store.getters.getUser.displayName[0] }}
                </span>
              </div>
            </div>

            <div class="grid">
              <span class="truncate">{{ $store.getters.getUser.displayName }}</span>
              <span class="truncate">
                {{ $store.getters.getUser.email }}
              </span>
            </div>
          </div>
          <router-link v-if="!$store.getters.isAdmin" :to="{ name: 'MyRequests' }">
            <a class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white">My Requests</a>
          </router-link>

          <hr />

          <a class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-red-600 hover:text-white" href="#" @click="logout">Logout</a>
        </template>
      </dropdown>
    </div>
  </nav>
</template>

<script>
import { logout } from "@/api/auth";
import Dropdown from "./Dropdown.vue";

export default {
  components: { Dropdown },
  name: "Navigate",

  data() {
    return {
      show: false,
    };
  },

  methods: {
    toggle() {
      this.show = !this.show;
      toggleCollapse("mobile-menu", this.show);
    },

    logout() {
      logout(this.$router.replace("/"));
      this.$swal.fire({
          icon: "success",
          title: "Signed Out successfully",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
    },
  },
};
</script>