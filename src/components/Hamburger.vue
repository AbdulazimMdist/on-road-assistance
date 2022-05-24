<template>
  <button class="grid place-items-center w-10 h-10 ease-in-out hamburger lg:hidden" :class="{ active: show }" @click="$emit('click')">
    <svg class="w-6 h-6 text-secondary-600 transition duration-150 ease-in-out fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect y="4" width="24" height="2.4" />
      <rect y="11" width="24" height="2.4" />
      <rect y="18" width="24" height="2.4" />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
};
</script>

<style lang="scss">
.hamburger {
  svg > * {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      transform-origin: center;
      transform: rotate(0deg);
    }

    &:nth-child(1) {
      transition: y 0.075s 0.12s ease, opacity 0.075s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    &:nth-child(2) {
      transition-property: transform;
      transition-duration: 0.075s;
      transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    &:nth-child(3) {
      transition: y 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
  }

  &.active {
    svg > * {
      &:nth-child(1) {
        opacity: 0;
        transform: rotate(45deg);
        y: 11;
        transition: y 0.075s ease, opacity 0.075s 0.12s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
      }

      &:nth-child(2) {
        transform: rotate(45deg);
        transition-delay: 0.12s;
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }

      &:nth-child(3) {
        y: 11;
        transform: rotate(-45deg);
        transition: y 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }
}
</style>
