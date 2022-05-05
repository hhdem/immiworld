<template>
    <header class="bg-gray-100 dark:bg-zinc-900 dark:border-gray-700 border-b-2 border-gray-100 ">
        <div class=" max-w-screen-lg mx-auto flex justify-center items-center py-2 md:justify-start md:space-x-10">
            <div class="lg:w-0 lg:flex-1 flex gap-2">
                <logo :isStickable="true" :isSticky="isSticky" />
                
            </div>
            <nav class="hidden md:flex gap-3">
                <darkmode/>
                <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-0 lg:mt-0 bg-transparent text-black p-0 lg:p-0 z-20">
                    <nuxt-link
                        :to="localePath('/country')"
                        class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition ease-in-out duration-150"
                        >
                        {{ $t('navbar.country') }}</nuxt-link
                    >
                </div>
                <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-0 lg:mt-0 bg-transparent text-black p-0 lg:p-0 z-20">
                    <nuxt-link
                        :to="localePath('/consultant')"
                        class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition ease-in-out duration-150"
                        >
                        {{ $t('navbar.consultant') }}</nuxt-link
                    >
                </div>
                <!-- 未登录 -->
                <template v-if="!isAuthenticated">
                    <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-0 lg:mt-0 bg-transparent text-black p-0 lg:p-0 z-20">
                        <nuxt-link
                            class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition ease-in-out duration-150"
                            :to="localePath('/signup')"
                        >
                            {{ $t('navbar.signup') }}
                        </nuxt-link>
                    </div>
                    <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-0 lg:mt-0 bg-transparent text-black p-0 lg:p-0 z-20">
                        <nuxt-link
                            class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition ease-in-out duration-150"
                            :to="localePath('/signin')"
                        >
                            {{ $t('navbar.signin') }}
                        </nuxt-link>
                    </div>
                </template>
                <!-- 已登录 -->
                <template v-if="isAuthenticated">
                    <li class="pr-1 flex relative">
                        <button type="button" class="inline-flex items-center justify-between px-2 py-1 font-medium text-gray-700 transition-all duration-500 rounded-md focus:outline-none" @click="isMenuVisible = !isMenuVisible" @blur="isMenuVisible = false">
                        <img :src="currentUser.profile.avatar.path|picFullUrl" v-if="currentUser.profile && currentUser.profile.avatar && currentUser.profile.avatar.path" class="h-8 w-8 border-2 border-double border-gray-400  rounded-full cursor-pointer">
                        <img src="~/assets/images/noavatar.jpg" class="h-8 w-8 border-2 border-double border-gray-400  rounded-full cursor-pointer" v-else>
                        </button>
                        <!-- <nuxt-link
                            to="/info"
                            class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline align-middle leading-8"
                            >{{ currentUser.name || "Guest" }} 您好</nuxt-link
                        > -->
                        <transition enter-active-class="transition duration-300 ease-out transform" enter-class="-translate-y-3 scale-95 opacity-0" enter-to-class="translate-y-0 scale-100 opacity-100" leave-active-class="transition duration-150 ease-in transform" leave-class="translate-y-0 opacity-100" leave-to-class="-translate-y-3 opacity-0">
                            <div v-show="isMenuVisible" class="absolute pt-12  right-0 z-50">
                            <div class="relative py-1 bg-white border border-gray-200 dark:bg-zinc-800 dark:border-gray-900 rounded-md shadow-xl ">
                                <div class="bg-white dark:bg-zinc-800 dark:border-zinc-900 absolute top-0 w-4 h-4 origin-center transform rotate-45 translate-x-24 -translate-y-2  border-t border-l rounded-sm pointer-events-none"></div>
                                <div class="relative text-center px-4 w-32 divide-y text-gray-700 dark:text-gray-300 ">
                                    <nuxt-link
                                        to="/setting"
                                        class="block  no-underline align-middle leading-8 border-gray-500 dark:hover:text-gray-200"
                                        >設置</nuxt-link
                                    >
                                    <nuxt-link
                                        to="/messages"
                                        class="block no-underline align-middle leading-8 dark:hover:text-gray-200"
                                        >消息
                                    </nuxt-link>
                                    <span class="block px-4 capitalize cursor-pointer py-2 dark:hover:text-gray-200" @click="logout">
                                        登出
                                    </span>
                                </div>
                            </div>
                            </div>
                        </transition>
                    </li>
                </template>
            </nav>
            
        </div>
    </header>
</template>
<script>
import logo from "@/components/logo";
import darkmode from "@/components/darkmode";
export default {
    name: "navbar",
    data() { 
        return {
            isMenuVisible: false
        };
    },
    components: {
        darkmode,
        logo
    },
    methods: {
        logout() {
            this.$store.commit('revokeAuthentication');
            this.$router.push(this.localePath("/"));
        },
    },
    computed: {
        isSticky() {
            return this.scrollY > 10;
        },
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
        currentUser() {
            return this.$store.state.currentUser;
        }
    }
}
</script>