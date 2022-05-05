<template>
  <nuxt-link
    :class="classList"
    class="dark:text-gray-300 dark:hover:text-white  flex no-underline hover:no-underline font-bold text-4xl my-0"
    :to="localePath('/')"
  >
    <!--Icon from: http://www.potlabicons.com/ -->
    FHSL
  </nuxt-link>
</template>

<script>
export default {
  name: "Logo",
  props: {
    isStickable: {
      type: Boolean,
      default: false,
    },
    isSticky: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classList() {
      let classList = "";
      if (this.isStickable) {
        classList = this.isSticky ? "text-gray-800" : "text-gray-600";
      } else {
        classList = "text-orange-600";
      }
      return classList;
    },
  },
};
</script>
