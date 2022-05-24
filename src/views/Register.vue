<template>
  <div class="flex">
    <div class="w-full md:w-1/2 lg:w-1/3 bg-white border-r h-screen grid place-items-center">
      <div class="p-8 w-full grid gap-10">
        <h3 class="text-3xl font-bold w-full">Sign Up</h3>
        <ValidationObserver>
          <form @submit.prevent>
            <ValidationProvider name="Name" rules="required|alpha" v-slot="{ errors }">
              <div class="pb-4">
                <label>Name</label>
                <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="text" placeholder="Enter your name" v-model="name" />
                <span class="text-red-600 text-xs">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider tag="div" class="my-2" name="E-mail" rules="required|email" v-slot="{ errors }">
              <div class="pb-4">
                <label>E-mail</label>
                <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="email" placeholder="Enter your e-mail" v-model="email" />
                <span class="text-red-600 text-xs">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider name="Password" rules="required|max:12|min:6" v-slot="{ errors }">
              <div class="pb-4">
                <label>Password</label>
                <input
                  class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600"
                  type="password"
                  placeholder="Enter your password"
                  v-model="password"
                  @keyup.enter="onSubmit"
                />
                <span class="text-red-600 text-xs">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <button @click="onSubmit" class="btn bg-blue-600 text-white hover:bg-blue-700 my-5">Register</button>
          </form>
        </ValidationObserver>

        <h4 class="text-center font-normal w-full">
          Already have an account?
          <router-link class="text-blue-600 font-semibold hover:underline" :to="{ name: 'login' }">Sign In</router-link>
        </h4>
      </div>
    </div>
    <div
      class="hidden md:block bg-local hover:bg-fixed h-screen bg-no-repeat bg-cover flex-1 bg-bottom bg-blend-lighten bg-blue-800"
      :style="`background-image: url(${require('@/assets/car.jpeg')})`"
    ></div>
  </div>
</template>

<script>
import { register } from "../api/auth";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      acceptTerms: null,
    };
  },

  methods: {
    onSubmit() {
      register(this.name, this.email, this.password, () => {
        this.$router.push({ name: "home" });
        this.$swal.fire({
          icon: "success",
          title: "Signed Up successfully",
          toast: true,
          position: "top-end",
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