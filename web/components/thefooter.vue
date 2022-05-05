<template>
<footer class="max-w-screen-lg mx-auto bottom-0 left-0 pt-4 pb-8">
  <div class="flex justify-items-start gap-4 dark:text-gray-300 leading-10 ">
    <nuxt-link
          :to="localePath({path: '/help/home'})"
          class="text-sm transition ease-in-out duration-150 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
          >{{ $t('footer.docs') }}</nuxt-link>
          
    <div class="text-sm transition ease-in-out duration-150 " >

      <nuxt-link
        v-if="$i18n.locale !== 'en'"
        :to="switchLocalePath('en')"
        class="text-sm transition ease-in-out duration-150 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
      >
        English
      </nuxt-link>

      <nuxt-link
        v-if="$i18n.locale !== 'zh'"
        :to="switchLocalePath('zh')"
        class="text-sm transition ease-in-out duration-150 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
      >
        中文
      </nuxt-link>
    </div>
  </div>
</footer>
</template>
<script>
export default {
  name: "thefooter",

}
</script>