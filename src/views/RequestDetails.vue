<template>
  <div>
    <navigation />
    <div class="grid place-items-center w-full bg-gray-50">
      <div class="bg-white max-w-3xl relative overflow-x-auto shadow-md sm:rounded-lg w-full my-4">
        <table v-if="request" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody class="w-full">
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full">
              <td class="px-6 py-4">Author</td>
              <td class="px-6 py-4">{{ request.author }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">User ID</td>
              <td class="px-6 py-4">{{ uid }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Request ID</td>
              <td class="px-6 py-4">{{ id }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Make</td>
              <td class="px-6 py-4">{{ request.make }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Model</td>
              <td class="px-6 py-4">{{ request.model }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Year</td>
              <td class="px-6 py-4">{{ request.year }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Issue</td>
              <td class="px-6 py-4">{{ request.issue.title }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Location</td>
              <td class="px-6 py-4">
                <a :href="getMapUrl" class="text-blue-600 font-medium hover:underline" target="_blank">Click to view</a>
              </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Location Type</td>
              <td class="px-6 py-4">{{ request.location_type }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Quantity</td>
              <td class="px-6 py-4">{{ request.quantity }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Price</td>
              <td class="px-6 py-4">{{ request.price }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Status</td>
              <td class="px-6 py-4">{{ request.status }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Additional Notes</td>
              <td class="px-6 py-4">{{ request.text }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Contact Name</td>
              <td class="px-6 py-4">{{ request.contact_name }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Contact No</td>
              <td class="px-6 py-4">{{ request.contact_no }}</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">Gender</td>
              <td class="px-6 py-4">{{ request.gender }}</td>
            </tr>
          </tbody>
        </table>
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
import { getRequestDetails } from "@/api/requsetForm";

export default {
  components: { Navigation },

  created() {
    const { uid, id } = this.$route.query;
    this.uid = uid;
    this.id = id;
    this.getDetails(uid, id);
  },

  computed: {
    getMapUrl() {
      return `https://yandex.com/maps/?pt=${this.request?.location?.longitude}%2C${this.request?.location?.latitude}&z=15`;
    },
  },

  data() {
    return {
      request: null,
      uid: 0,
      id: 0,
    };
  },

  methods: {
    getDetails(uid, id) {
      getRequestDetails(uid, id, (data) => {
        this.request = data;
      });
    },
  },
};
</script>
