<template>
  <div class="flex">
    <div class="w-full md:w-1/2 lg:w-1/3 bg-white border-r h-screen grid place-items-center">
      <div class="p-8 w-full grid gap-3">
        <h3 class="text-3xl font-bold w-full">Login</h3>

        <ValidationObserver>
          <form @submit.prevent>
            <ValidationProvider tag="div" name="E-mail" rules="required|email" v-slot="{ errors }">
              <div class="">
                <label class="pb-2">E-mail</label>
                <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="email" placeholder="Enter your e-mail" v-model="email" />
                <span class="text-red-600 text-xs">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </form>
        </ValidationObserver>
        <div class="text-right">
          <router-link class="text-right text-blue-600 font-semibold hover:underline text-sm" :to="{ name: 'forgotPassword' }"> Forgot password? </router-link>
        </div>

        <ValidationProvider tag="div" name="Password" rules="required|min:6|max:12" v-slot="{ errors }">
          <div class="">
            <label class="pb-2">Password</label>
            <input class="p-2 w-full border border-gray-300 rounded outline-none focus:border-blue-600" type="password" placeholder="Enter your password" v-model="password" @keyup.enter="onSubmit" />
            <span class="text-red-600 text-xs">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <button @click="onSubmit" class="my-4 w-full btn bg-blue-600 text-white hover:bg-blue-700">Login</button>

        <button @click="googleAuth" class="btn hover:bg-blue-400 border border-blue-600 text-blue-600">Sign in with Google</button>

        <p class="text-center font-normal w-full">
          Don't have an account?
          <router-link class="text-blue-600 font-semibold hover:underline" :to="{ name: 'register' }"> Sign Up </router-link>
        </p>
      </div>
    </div>
    <div
      class="hidden md:block bg-local hover:bg-fixed flex-1 h-screen bg-no-repeat bg-cover bg-bottom bg-blend-lighten bg-blue-800"
      :style="`background-image: url( ${require('@/assets/bg.jpeg')})`"
    ></div>
  </div>
</template>

<script>
import { login, googleAuth } from "../api/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    onSubmit() {
      login(this.email, this.password, () => {
        this.$router.replace({ name: "home" });
        this.$swal.fire({
          icon: "success",
          title: "Signed In successfully",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
    },

    googleAuth() {
      googleAuth(() => {
        this.$router.replace({ name: "home" });
      });
    },
  },
};
</script>

<style>
</style>