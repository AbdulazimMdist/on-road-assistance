<template>
  <div class="flex">
    <div class="w-full md:w-1/2 lg:w-1/3 bg-white border-r h-screen grid place-items-center">
      <div class="p-8 w-full grid gap-8">
        <h3 class="text-3xl font-bold w-full">Reset Password</h3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(resetPassword)">
            <ValidationProvider tag="div" class="my-2" name="E-mail" rules="required|email" v-slot="{ errors }">
              <div class="">
                <label class="pb-2">E-mail</label>
                <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="email" placeholder="Enter your e-mail" v-model="email" />
                <span class="text-red-600 text-xs">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </form>
        </ValidationObserver>

        <button @click="resetPassword" class="btn bg-blue-600 text-white hover:bg-blue-700">Continue</button>
        <p class="text-center font-normal w-full">
          Back to
          <router-link class="text-blue-600 font-semibold hover:underline" :to="{ name: 'login' }">Login</router-link>
        </p>
      </div>
    </div>
    <div
      class="hidden md:block bg-local hover:bg-fixed bg-bottom h-screen bg-blend-lighten bg-no-repeat bg-cover flex-1 bg-blue-800"
      :style="`background-image : url(${require('@/assets/register.jpg')})`"
    ></div>
  </div>
</template>

<script>
import { resetPassword } from "@/api/auth";

export default {
  data() {
    return {
      email: "",
    };
  },

  methods: {
    resetPassword() {
      resetPassword(this.email, () => {
        console.log("Success");
        this.$swal.fire({
          icon: "success",
          title: "Reset link has been sent!",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
    },
  },
};
</script>

<style>
</style>