<template>
<div class=" max-w-screen-lg mx-auto  pt-4">
  <div class="grid grid-cols-6 gap-4  dark:text-zinc-300">
    <div class="col-span-4 flex content-center bg-gray-100 dark:bg-zinc-900">
      <div class="w-full">
        <form class="shadow-md rounded px-8 pt-6 pb-8 " @submit.prevent.stop="handleSubmit">
          <div class="text-center mb-4">
            <h1 class="h3 mb-3 font-weight-normal">{{$t('signup.title')}}</h1>
          </div>

          <div class="relative">
            <font-awesome-icon
            :icon="['fas', 'user']"
            class="absolute cursor-pointer  ml-3 mt-3"
            />
            <input
              id="username"
              name="username"
              v-model="username"
              type="text"
            class="focus-within:border-blue-500 dark:focus-within:border-gray-100 dark:bg-zinc-600 focus-within:rounded-sm focus-within:outline-none w-full text-sm text-black dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 rounded-md py-2 pl-10"
              :placeholder="$t('signin.username')"
              required
              autofocus
            />
          </div>
          <div class="text-right text-gray-500 text-xs">{{$t('signup.username_valid')}}</div>
          <div class="relative pt-3">
            <font-awesome-icon
            :icon="['fas', 'key']"
            class="absolute cursor-pointer  ml-3 mt-3"
            />
            <input
              id="password"
              name="password"
              v-model="password"
              type="password"
            class="focus-within:border-blue-500 dark:focus-within:border-gray-100 dark:bg-zinc-600 focus-within:rounded-sm focus-within:outline-none w-full text-sm text-black dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 rounded-md py-2 pl-10"
              :placeholder="$t('signin.password')"
              required
            />
          </div>
          <div class="text-right text-gray-500 text-xs">{{$t('signup.password_valid')}}</div>
          <div class="relative pt-3">
            <font-awesome-icon
            :icon="['fas', 'crosshairs']"
            class="absolute cursor-pointer ml-3 mt-3"
            />
            <input
              id="repassword"
              name="repassword"
              v-model="repassword"
              type="password"
            class="focus-within:border-blue-500 dark:focus-within:border-gray-100 dark:bg-zinc-600 focus-within:rounded-sm focus-within:outline-none w-full text-sm text-black dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 rounded-md py-2 pl-10"
              :placeholder="$t('signup.repassword')"
              required
            />
          </div>
          <div class="flex justify-center content-center gap-2 pt-5">
            <slide-verify ref="slideblock" :l="42"
              :r="10"
              :w="310"
              :h="155"
              :imgs="slideimages"
              :slider-text="$t('signin.slideright')"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
              ></slide-verify>
          </div>
          <div class="flex justify-center pt-2">{{msg}}</div>
          <div class="flex justify-center content-center gap-2 pt-6">
              <button
              class="bg-gray-600 hover:bg-gray-700 text-gray-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              :disabled="isProcessing"
            >
            {{ isProcessing ? $t('common.processing') : $t('signup.signup') }}

            </button>
          </div>

          <p class="mt-5 mb-3 text-muted text-center">&copy; 2021</p>
        </form>
      </div>
    </div>
    <div class="col-span-2 ">
      <div class="shadow-md rounded px-8 pt-6 pb-8 bg-gray-100 dark:bg-zinc-900 ">
        <div class="mb-2">其它注册方式</div>
        <button class="btn text-center my-2 bg-gray-500 text-gray-300 py-1 px-4 rounded" @click="changeLoginMode">
          Google账户登录
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import authorizationAPI from "../api/auth";
import { Toast } from "../plugins/sweetalert2";
import { mapMutations } from "vuex";
import img0 from '~/assets/images/verify/verify1.png';
import img1 from '~/assets/images/verify/verify2.png';
import img2 from '~/assets/images/verify/verify3.png';
import img3 from '~/assets/images/verify/verify4.png';
export default {
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
      isProcessing: false,
      msg: '',
      slideimages: [img0, img1, img2, img3],
      verified: false,
    };
  },
  methods: {
    ...mapMutations(["setCurrentUser"]),
    async handleSubmit() {
      try {
        if (!this.username || !this.password || !this.repassword || !this.verified) {
          Toast.fire({
            icon: "warning",
            title: this.$t('warnings.mustinput'),
          });
          return;
        }
        // if (this.repassword !== this.password) {
        //   Toast.fire({
        //     icon: "warning",
        //     title: "密码不匹配",
        //   });
        //   return;
        // }
        this.isProcessing = true;
        const res = await authorizationAPI.signUp({
          username: this.username,
          password: this.password,
          repassword: this.repassword,
        });
        const { data, statusText, status } = res;
        if (res.statusText !== "OK" || res.status !== 200) {
          throw new Error(res.statusText);
        }
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        let adm = false;
        if (res.data.role == "ADMIN") {
          adm = true;
        }
        console.info(adm);
        // this.setCurrentUser({ name: this.username, isAdmin: adm });
        this.setCurrentUser({ id: data.id, name: this.username, isAdmin: adm, profile: data.profile });
        Toast.fire({
          icon: "success",
          title: "登入成功",
        });
        this.$router.push("/signin");
      } catch (error) {
        this.password = "";
        this.repassword = "";
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: error.data.message,
        });
        this.$refs.slideblock.reset();
        
      }
    },
    onSuccess(times){
        this.msg = `Success, 耗时${(times / 1000).toFixed(1)}s`
        this.verified = true;
    },
    onFail(){
        this.msg = '';
        this.verified = true;
    },
    onRefresh(){
        this.msg = '';
        this.verified = true;
    },
    changeLoginMode() {
      Toast.fire({
        icon: "warning",
        title: this.$t('warnings.nofunction')
      });
    }
  },
};
</script>
<style>
.slide-verify-slider{
  border: 0px solid #e4e7eb;
  height: 38px;
}
.container-success .slide-verify-slider-mask {
  height: 38px;
}
.container-success .slide-verify-slider-mask-item{
  height: 38px;
}
.slide-verify-slider .slide-verify-slider-mask-item {
  height: 38px;
}
.dark .slide-verify-slider{
  background-color: #27272B;
}
.dark .slide-verify-slider-mask-item {
  height: 38px;
  background-color: #18181C;
}
.dark .slide-verify-slider-text{
  color: #D4D4D8;
}
</style>