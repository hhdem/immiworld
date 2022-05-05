<template>
<div class=" max-w-screen-lg mx-auto  pt-4">
  <div class="grid grid-cols-6 gap-4 text-gray-600 dark:text-zinc-300">
    <div class="col-span-4">
      <form class="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-100 dark:bg-zinc-900 " @submit.prevent.stop="handleSubmit">
        <div class="text-center mb-6">
          <h1 class="h2 mb-3 font-weight-normal">{{$t('signin.title')}}</h1>
        </div>

        <div class="relative">
          <font-awesome-icon
          :icon="['fas', 'user']"
          class="absolute cursor-pointer ml-3 mt-3"
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

        <div class="relative pt-6" v-if="loginMode=='password'">
          <font-awesome-icon
          :icon="['fas', 'key']"
          class="absolute cursor-pointer ml-3 mt-3"
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

        <div class="relative pt-6" v-if="loginMode=='validcode'">
          <font-awesome-icon
          :icon="['fas', 'envelope']"
          class="absolute cursor-pointer ml-3 mt-3"
          />
          <input
            id="validcode"
            name="validcode"
            v-model="validcode"
            type="text"
            class="focus-within:border-blue-500 dark:focus-within:border-gray-100 dark:bg-zinc-600 focus-within:rounded-sm focus-within:outline-none w-full text-sm text-black dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 rounded-md py-2 pl-10"
            :placeholder="$t('signin.validcode')"
            required
          />
        </div>

        <div class="flex justify-center pt-6">
          <slide-verify ref="slideblock" :l="42"
            :r="10"
            :slider-text="$t('signin.slideright')"
            :imgs="slideimages"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            ></slide-verify>
        </div>
        <div class="flex justify-center pt-2">{{msg}}</div>

        <div class="flex justify-center content-center gap-2 pt-6">
            <button
            class="bg-gray-600 hover:bg-gray-700 text-gray-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            type="submit"
            :disabled="isProcessing"
          >
            {{ isProcessing ? $t('common.processing') : $t('signin.signin') }}
          </button>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2021</p>
      </form>
    
    </div>
    <div class="col-span-2 content-center">
      <div class="shadow-md rounded px-8 pt-6 pb-8 bg-gray-100 dark:bg-zinc-900 ">
        <div class="mb-2">其它登录方式</div>
        <button class="btn text-center my-2 bg-gray-500 text-gray-300 py-1 px-4 rounded" @click="changeLoginMode">
          邮箱验证码登录
        </button>
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
import { mapMutations, mapState } from "vuex";
import img0 from '~/assets/images/verify/verify1.png';
import img1 from '~/assets/images/verify/verify2.png';
import img2 from '~/assets/images/verify/verify3.png';
import img3 from '~/assets/images/verify/verify4.png';
export default {
  data() {
    return {
      username: "",
      password: "",
      isProcessing: false,
      msg: '',
      slideimages: [img0, img1, img2, img3],
      verified: false,
      loginMode: 'password'
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.username || !this.password || !this.verified) {
          Toast.fire({
            icon: "warning",
            title: "請填入必填项及验证",
          });
          return;
        }
        
        this.isProcessing = true;
        const res = await authorizationAPI.signIn({
          username: this.username,
          password: this.password,
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
        console.info('res: ', res);
        // this.setCurrentUser({ id: data.id, name: this.username, isAdmin: adm, profile: data.profile });
        this.$store.commit('setCurrentUser', { id: data.id, name: this.username, isAdmin: adm, profile: data.profile });
        Toast.fire({
          icon: "success",
          title: "登入成功",
        });
        this.$router.push("/");
      } catch (error) {
        this.password = "";
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: this.$t('warnings.accountandpassword'),
        });
        this.$refs.slideblock.reset();
        this.msg = '';
        console.error(error);
      }
    },
    onSuccess(times){
        // this.msg = `Success, 耗时${(times / 1000).toFixed(1)}s`
        this.verified = true;
    },
    onFail(){
        this.msg = '';
        this.verified = false;
    },
    onRefresh(){
        this.msg = '';
        this.verified = false;
    },
    gotoHome() {
      this.$router.push("/");
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
