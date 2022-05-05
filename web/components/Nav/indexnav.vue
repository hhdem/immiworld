<template>
    <div class="sticky top-0">
        <div class="pb-6 ">
          <div class="flex items-center border-b border-gray-500 py-2">
              
              <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                type="text" 
                placeholder="Key words" 
                aria-label="Search"
                v-model="search"
              >
              <nuxt-link
              class="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded" 
              type="button" 
              :to="{
                name: 'ccp',
                query: { search },
              }"
              no-prefetch
              :disabled="isProcessing" 
              >
                
                <font-awesome-icon 
                  v-if="!isProcessing"
                  :icon="['fas', 'search']"
                  class="cursor-pointer text-gray"
                />
                <font-awesome-icon 
                  v-if="isProcessing"
                  :icon="['fas', 'star']"
                  class="fa-spin cursor-pointer text-gray"
                />
              </nuxt-link>
            
          </div>
        </div>
          <button
              class="w-full bg-default hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded hover:underline"
              @click="createNew"
            >
              新增
            </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isProcessing: false,
        };
    },
    props: {
        search: {
            type: [String],
            default: "",
        },
        currentPage: {
            type: Number,
            default: -1,
        },
        totalPage: {
            type: Number,
            default: -1,
        },
    },
    methods: {
        createNew() {

        },
    }
}
</script>