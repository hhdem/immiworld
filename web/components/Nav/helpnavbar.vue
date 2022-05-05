<template>
    <header class=" dark:bg-zinc-900 dark:border-gray-700 border-b-2 border-gray-100 ">
        <div class="container max-w-screen-lg mx-auto relative flex items-center py-2 h-full justify-between dark:text-gray-300">
            <div class="lg:w-0 lg:flex-1 flex gap-2">
                <logo/>
                <darkmode/>
            </div>
            <nav class="lg:flex lg:pt-1 xl:pt-0">
                <ul class="flex gap-2">
                    <li class="xl:px-4 lg:py-0 lg:px-2 py-2">
                        <nuxt-link :to="localePath('/')" class="dark:text-gray-300">{{ $t('common.home') }}</nuxt-link>
                    </li>
                    <li class="xl:px-4 lg:py-0 lg:px-2 py-2">
                        <nuxt-link :to="localePath({path: '/help/home'})" class="dark:text-gray-300">{{ $t('footer.docs') }}</nuxt-link>
                    </li>
                    <li class="xl:px-4 lg:py-0 lg:px-2 py-2">
                        <nuxt-link :to="localePath({path: '/help/about'})" class="dark:text-gray-300">{{ $t('footer.about') }}</nuxt-link>
                    </li>
                    <li class="xl:px-4 lg:py-0 lg:px-2 py-2">
                        <nuxt-link :to="localePath({path: '/help/joinus'})" class="dark:text-gray-300">{{ $t('footer.joinus') }}</nuxt-link>
                    </li>
                    <li class="xl:px-4 lg:py-0 lg:px-2 py-2">
                        <nuxt-link :to="localePath({path: '/help/todo'})" class="dark:text-gray-300">{{ $t('footer.todo') }}</nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>
<script>
import logo from "@/components/logo";
import darkmode from "@/components/darkmode";
export default {
    name: "helpnavbar",
    components: {
        logo,
        darkmode,
    },
}
</script>