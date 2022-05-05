<template>
  <div class="dark:bg-zinc-800 leading-normal tracking-normal w-full min-h-screen h-auto">
    <helpnavbar/>
    <main class="p-2 max-w-screen-lg mx-auto">
      <aside class="block mt-8 -mx-4 bg-gray-100 opacity-transition lg:bg-transparent lg:mt-0 lg:mx-0 lg:inset-0 z-90 lg:mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-1/4 lg:block hidden lg:block">
          <div class="h-full overflow-y-auto scrolling-touch text-center lg:text-left lg:h-auto lg:block lg:relative lg:sticky lg:top-24">
            <nav class="pt-8 lg:overflow-y-auto lg:block lg:pl-0 lg:pr-8 sticky?lg:max-h-(screen-24) hidden"></nav>
          </div>
      </aside>
      <div class="container pt-4 dark:text-gray-300">
        <Nuxt />
      </div>  
    </main>
  </div>
</template>

<script>
import helpnavbar from "@/components/Nav/helpnavbar";
export default {
    name: "help",
    components: {
        helpnavbar,
    },
}
</script>