<template>
  <div class="request-bg grid place-items-center p-4">
    <div class="rounded border shadow bg-white max-w-xl w-full mx-auto">
      <ValidationObserver ref="requestFormObserver" tag="div" class="flex flex-col gap-4 overflow-y-auto p-8">
        <h3 class="text-3xl font-bold w-full mb-4">Request Form</h3>

        <ValidationProvider tag="div" name="Make" rules="required" v-slot="{ errors }">
          <label class="pb-2">Make</label>
          <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="text" v-model="form.make" />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" name="model" rules="required" v-slot="{ errors }">
          <label class="pb-2">Model</label>
          <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="text" v-model="form.model" />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" name="year" rules="required" v-slot="{ errors }">
          <label class="pb-2">Year</label>
          <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="text" v-mask="'####'" v-model="form.year" />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" name="issue" rules="required" v-slot="{ errors }">
          <label class="pb-2">Issue</label>

          <select v-model="form.issue" class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600">
            <option :key="item.title" v-for="item in issues" :value="item">
              {{ item.title }}
            </option>
          </select>
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" name="quantity" rules="required" v-slot="{ errors }">
          <label class="pb-2">Quantity</label>
          <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" min="1" type="number" v-model="form.quantity" />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" name="location type" rules="required" v-slot="{ errors }">
          <label class="pb-2">Type of Location</label>

          <select v-model="form.location_type" class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600">
            <option>Roadway</option>
            <option>Median / Between lanes of traffic</option>
            <option>Shoulder</option>
            <option>Residence</option>
            <option>Parking Lot</option>
            <option>Parking Garage</option>
          </select>
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" name="contact name" rules="required" v-slot="{ errors }">
          <label class="pb-2">Contact Name</label>
          <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="text" v-model="form.contact_name" />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" name="gender" rules="required" v-slot="{ errors }">
          <label class="pb-2">Gender</label>

          <select v-model="form.gender" class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600">
            <option>Male</option>
            <option>Female</option>
          </select>
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" name="contact" rules="required" v-slot="{ errors }">
          <label class="pb-2">Contact No</label>
          <input
            class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600"
            type="text"
            v-mask="'+###(##) ###-##-##'"
            placeholder="e.g. +998(00) 123-45-67"
            v-model="form.contact_no"
          />
          <span class="text-red-600 text-xs">{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="">
          <label class="pb-2">Notes</label>
          <br />
          <textarea class="w-full border border-gray-300 rounded outline-none focus:border-blue-600" v-model="form.text" placeholder="Additional notes" />
        </div>

        <p class="text-xl font-bold text-blue-600">
          {{ getPrice }}
        </p>

        <button @click="newRequest" class="w-full btn bg-blue-600 text-white hover:bg-blue-700">Request</button>

        <button @click="clearForm" class="w-full border border-red-700 btn bg-white text-red-700 hover:bg-red-700 hover:text-white">Clear</button>
      </ValidationObserver>
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
import { addNewRequest } from "@/api/requsetForm";
export default {
  computed: {
    getPrice() {
      if (this.form.issue && this.form.quantity >= 1) {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "UZS",
        });

        const price = formatter.format(this.form.issue.price * this.form.quantity);

        this.form.price = price;

        return price;
      }
    },
  },

  data() {
    return {
      requestList: null,
      form: {
        make: "",
        model: "",
        year: "",
        issue: null,
        quantity: 1,
        location_type: "",
        contact_name: "",
        gender: "",
        contact_no: "",
        text: "",
      },
      //indicating price of request
      issues: [
        {
          title: "Flat Tire",
          price: 400000,
        },
        {
          title: "Key Lock Out",
          price: 250000,
        },
        {
          title: "Fuel",
          price: 9000,
        },
        {
          title: "Towing",
          price: 600000,
        },
        {
          title: "Jump Start",
          price: 250000,
        },
        {
          title: "Diagnostics",
          price: 450000,
        },
        {
          title: "Coolant Filling",
          price: 50000,
        },
        {
          title: "Car Wash",
          price: 200000,
        },
        {
          title: "Windshield Change",
          price: 500000,
        },
      ],
    };
  },

  methods: {
    newRequest() {
      this.$refs.requestFormObserver.validate().then((validate) => {
        if (validate) {
          addNewRequest({ ...this.form, createdAt: Date.now(), updatedAt: Date.now() }, () => {
            this.$router.push("/");
            this.$swal.fire({
              icon: "success",
              title: "Your work has been submitted",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    },

    clearForm() {
      this.form = {
        make: "",
        model: "",
        year: "",
        issue: null,
        quantity: 1,
        location_type: "",
        contact_name: "",
        gender: "",
        contact_no: "",
        text: "",
      };

      this.$refs.requestFormObserver.reset();
    },
  },
};
</script>

<style lang="scss">
.request-bg {
  @apply bg-cover bg-no-repeat bg-fixed;

  background-image: url("../assets/request.jpg");
}
</style>