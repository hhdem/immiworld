<template>
  <div class="bg-gray-200 dark:bg-zinc-800 leading-normal tracking-normal w-full min-h-screen h-auto">
    <navbar />
    <nuxt keep-alive/>
    <thefooter />
  </div>
</template>

<style lang="scss" scoped>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.container {
  max-width: 1060px;
  min-width: 600px;
}
.gradient {
  /* background: linear-gradient(90deg, #6200ee 0%, #03dac5 100%);  */
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}
</style>

<script>
export default {
  head () {
    return this.$nuxtI18nHead()
  }
}
</script>
