<template>
  <div>
    <navigation />

    <div class="w-full">
      <img class="mx-auto w-full" src="../assets/main.jpg" alt="" />
    </div>

    <div class="max-w-7xl mx-auto">
      <div class="p-4 w-full grid gap-3 my-4">
        <h1 class="text-3xl font-bold w-full text-center">ON ROAD ASSISTANCE PROGRAM...BECAUSE STUFF HAPPENS!</h1>
        <p class="p-4 w-full text-center">
          Whether "Stuff" consists of a mechanical breakdown, a flat tire, a dead battery, locked the keys in the car, or you've run out of gas; Our 24x7 On Road Assistance Hotline will dispatch a
          qualified professional and help keep your driver safe.
        </p>
        <div class="p-1 w-full grid gap-3 bg-gray-800 rounded-lg">
          <p class="w-full text-center text-2xl text-white">Features</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 md:grid-cols-2 md:gap-8 gap-4 p-4">
        <card v-for="service in services" :key="service.title" :img="service.img" :title="service.title" :phone="service.phone" :description="service.description" />
      </div>
    </div>

    <router-link
      class="w-14 h-14 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 ease-in-out fixed bottom-4 right-4 grid place-items-center"
      :to="{ name: 'RequestForm' }"
    >
      <span class="fa fa-lg fa-plus"></span>
    </router-link>

    <router-link
      class="w-14 h-14 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 ease-in-out fixed bottom-24 right-4 grid place-items-center"
      :to="{ name: 'UserChat' }"
    >
      <span class="fas fa-comments text-xl"></span>
      <span v-if="count > 0" class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-center text-sm">{{count}}</span>
    </router-link>

    <div>
      <footer class="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6">
        <span class="w-full text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 On Road Assistance™. All Rights Reserved. </span>
      </footer>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Card from "@/components/Card.vue";
import { getAllCount } from "@/api/chat";

export default {
  name: "HomeComponent",
  components: { Navigation, Card },
  mounted() {
    getAllCount((data) => (this.count = data));
  },
  data() {
    return {
      count: 0,
      services: [
        {
          img: "towing.jpg",
          title: "Towing",
          phone: "+998 99 814 22 66",
          description: `Should your vehicle not be fit to operate safely under its own power following a mechanical breakdown, it shall be towed to the nearest, appropriate repair facility or any destination of your choosing with up to $100 in towing charges. Flatbed service shall be available when necessary or upon request. </br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "battery.jpg",
          title: "Jump Start",
          phone: "+998 99 814 22 66",
          description: `Car won't start? Dead Battery? Our On Roadside Assistance Team will provide a jump start. </br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "fuel.jpg",
          title: "Fuel Delivery",
          phone: "+998 99 814 22 66",
          description: `Out of gas? A supply of fuel shall be delivered to enable you to reach the nearest available service station. Delivery of the fuel is at no charge, however the fuel is charged at per litre.</br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "tire.jpg",
          title: "Tire Changes",
          phone: "+998 99 814 22 66",
          description: `Flat tire? The tire needs to be changed? Don't worry, Our On Road Assistance Team will change your flat and install the inflated and usable spare tire.</br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "door.jpg",
          title: "LockOut Services",
          phone: "+998 99 814 22 66",
          description: `Locked your keys in the car? Or forgot your keys in the car? Here we go! Our On Road Assistance Team will be dispatched to open the vehicle.</br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "heating.jpg",
          title: "Coolant Filling",
          phone: "+998 99 814 22 66",
          description: `Your car is facing to heating problem? Don't worry! We are ready to help you here. Our On Road Assistance Team will fix your car's heating problem quickly.</br> For more information, Please reach out to our hotline.`,
        },
        {
          img: "oil.webp",
          title: "Oil Change",
          phone: "+998 99 814 22 66",
          description: `Need to Change Oil of Your Car? Our On Road Assistance will provide you with excellent service in terms of changing oil of your car.</br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "diagnostic.jpg",
          title: "Diagnostics",
          phone: "+998 99 814 22 66",
          description: `Your Car is not speeding up? Or there is something wrong with its computer? We are glad to help you to make your car better. Our qualified mechanics will provide you with diagnostics to find out the issue in your car.</br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "brakes.jpg",
          title: "Brakes Change",
          phone: "+998 99 814 22 66",
          description: `Is your car's brake making some sounds? Or your car's brakes need to be changed? We are ready to assist you here!</br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "windshield.jpg",
          title: "Windshield Change",
          phone: "+998 99 814 22 66",
          description: `Your Car's Windshield is damaged? Or there is scratch on your car's windshield? Our Experienced Mechanics will change your car's windshield quickly.</br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "charge.webp",
          title: "Electric Car Charge",
          phone: "+998 99 814 22 66",
          description: `Out of Charge? Your E-Car needs to get charged? We will help you to address your issue. </br> For more information, Please reach out to Our Hotline.`,
        },
        {
          img: "wash.jpg",
          title: "Car Wash",
          phone: "+998 99 814 22 66",
          description: `Car is dirty? Or needs to get washed? And you don't have time to do it? We are ready to wash car anytime. We will provide you with Express Car Wash Service. </br> For more information, Please reach out to Our Hotline.`,
        },
      ],
    };
  },
};
</script>
