<template>
    <span class="flex item-right text-gray-500 dark:text-gray-300 dark:hover:text-gray-100 items-center">
        <!-- <button class="text-gray-500" @click="changeMode">{{ btnLabel }}</button> -->

        <font-awesome-icon
        :icon="['fas', 'sun']"
        class="cursor-pointer h-2 pr-1"
        />
        <font-awesome-icon
        :icon="['fas', 'toggle-on']"
        class="cursor-pointer "
        v-if="btnLabel=='light'"
        @click="changeMode"
        />

        <font-awesome-icon
        :icon="['fas', 'toggle-off']"
        class="cursor-pointer"
        v-if="btnLabel=='dark'"
        @click="changeMode"
        />
        <font-awesome-icon
        :icon="['fas', 'moon']"
        class="cursor-pointer h-2 pl-1"
        />
    </span>
</template>

<script>
import { mapState} from "vuex";
export default {
  name: "darkmode",
  data() {
    return {
      isDark: false,
    };
  },
  computed: {
    btnLabel() {
      return this.$colorMode.preference === 'light' ? 'dark' : 'light'
    }
  },
  methods: {
    changeMode() {
      this.$colorMode.preference = this.$colorMode.preference === 'light' ? 'dark' : 'light';
   }
  },
};
</script>
