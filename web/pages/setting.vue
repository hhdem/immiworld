<template>
    <div class=" max-w-screen-lg mx-auto  pt-4 dark:text-gray-300">
        <div class="grid grid-cols-10 gap-4">
            <div class="col-span-6">
            
            <div class="mx-auto container shadow-md dark:bg-gray-800">
                <form @submit.prevent.stop="handleSubmit">
                    <div class="bg-gray-100 p-4 border-b-2 bg-opacity-5 border-gray-400 dark:border-zinc-700 rounded-t dark:bg-zinc-900">
                        <div class="max-w-sm mx-auto md:w-full md:mx-0">
                            <div class="inline-flex items-center space-x-4">
                            <img v-if="image" :src="image|picFullUrl" class="w-10 h-10 object-cover rounded-full"/>
                            <img src="~/assets/images/noavatar.jpg" aria-placeholder="默認頭像" class="w-10 h-10 object-cover rounded-full" v-else>

                            <h1 class="text-gray-600 dark:text-gray-300">{{user.showname}}, {{ $t('setting.membernumber', {number:user.id}) }}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white space-y-2 dark:bg-zinc-900">
                        <div class="grid grid-cols-8 gap-6 space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center  dark:text-gray-300">
                            <h2 class="col-span-2">{{ $t('setting.basicinfo.basicinfo')}}</h2>
                            <div class="col-span-6">
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.basicinfo.showname')}}</label>
                                    <div class="flex form-label-group mb-2 h3">
                                        {{user.username}}
                                    </div>
                                </div>
                                <div>
                                    <label for="avatar" class="text-sm text-gray-400">{{ $t('setting.basicinfo.avator')}}</label>
                                    <div class="flex form-label-group mb-2" v-if="image">
                                        <div class="pr-2">
                                        <img :src="image|picFullUrl" @click="$refs.file.click()" class="h-24 w-24 border-2 border-double border-gray-400 rounded-full cursor-pointer"/>
                                        </div>
                                        <div class="pr-2">
                                        <img :src="image|picFullUrl" @click="$refs.file.click()" class="h-12 w-12 border-2 border-double border-gray-400  rounded-full cursor-pointer"/>
                                        </div>
                                        <div class="pr-2">
                                        <img :src="image|picFullUrl" @click="$refs.file.click()" class="h-8 w-8 border-2 border-double border-gray-400  rounded-full cursor-pointer"/>
                                        </div>
                                    </div>
                                    <div class="flex form-label-group mb-2" v-else>
                                        <div class="pr-2">
                                        <img src="~/assets/images/noavatar.jpg" @click="$refs.file.click()" aria-placeholder="默認頭像" class="w-24 border-2 border-double border-gray-400 rounded-full cursor-pointer"/>
                                        </div>
                                        <div class="pr-2">
                                        <img src="~/assets/images/noavatar.jpg" @click="$refs.file.click()" aria-placeholder="默認頭像" class="w-12 border-2 border-double border-gray-400  rounded-full cursor-pointer"/>
                                        </div>
                                        <div class="pr-2">
                                        <img src="~/assets/images/noavatar.jpg" @click="$refs.file.click()" aria-placeholder="默認頭像" class="w-8 border-2 border-double border-gray-400  rounded-full cursor-pointer"/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.basicinfo.showname')}}</label>
                                    <div class="w-full inline-flex border dark:border-gray-500">
                                    
                                    <input
                                        type="text"
                                        class="w-full p-2 dark:bg-gray-800 dark:marker:hover:bg-gray-700"
                                        :placeholder="$t('setting.basicinfo.showname')"
                                        v-model="user.showname"
                                    />
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.basicinfo.phone')}}</label>
                                    <div class="w-full inline-flex border dark:border-gray-500">
                                    
                                    <input
                                        type="text"
                                        class="w-full p-2 dark:bg-gray-800 dark:hover:bg-gray-700"
                                        :placeholder="$t('setting.basicinfo.phone')"
                                        v-model="user.mobile"
                                    />
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.basicinfo.email')}}</label>
                                    <div class="w-full flex border dark:border-gray-500" v-if="user.emailStatus != 'ACTIVED'">
                                        <input
                                            type="text"
                                            class="grow p-2 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50"
                                            :placeholder="$t('setting.basicinfo.email')"
                                            v-model="user.email"
                                            :disabled="user.emailStatus == 'SENTCODE'"
                                        />
                                        <button @click="sendActiveEmail" type="button" id="sendActiveEmailButton" :disabled="user.emailStatus == 'SENTCODE'" class="w-fit gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-r-full px-4 py-2 dark:text-gray-200 dark:hover:text-gray-200 disabled:opacity-50">
                                            <font-awesome-icon
                                                :icon="['fas', 'inbox']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">{{user.emailStatus == 'SENTCODE'?$t('common.sent'):''}}{{$t('common.validcode')}}</span>
                                        </button>
                                    </div>
                                    <div v-if="user.emailStatus == 'ACTIVED'">
                                        {{user.email}}
                                        <font-awesome-icon
                                                :icon="['fas', 'check']"
                                                class="cursor-pointer "
                                            />
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.basicinfo.gender')}}</label>
                                    <div class="w-full inline-flex ">
                                        <div class="bg-gray-200 dark:bg-gray-600 text-sm text-gray-500 dark:text-gray-200 dark:hover:text-gray-200 leading-none border-2 border-gray-200 dark:border-gray-500 rounded-full inline-flex">
                                            <button @click="userGender('MALE')" id="userGenderMALE" class="userGender gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-r-full px-4 py-2 active-tab dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'male']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">{{ $t('common.male')}}</span>
                                            </button>
                                            <button @click="userGender('FEMALE')" id="userGenderFEMALE" class="userGender gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2  dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'female']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">{{ $t('common.female')}}</span>
                                            </button>
                                            <button @click="userGender('UNKNOWN')" id="userGenderUNKNOWN" class="userGender gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2  dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'question']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">{{ $t('common.unknown')}}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-4 text-red-300 dark:text-red-400" v-if="errors1.length">
                                    <b>{{ $t('setting.validmessage.correcterrors')}}</b>
                                    <ul>
                                    <li v-for="err in errors1" :key="err">{{ err }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="border-b dark:border-gray-600" ></div>
                        <div class="grid grid-cols-8 gap-6 space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center  dark:text-gray-300">
                            <h2 class="col-span-2">{{ $t('setting.password.password')}}</h2>
                            <div class="col-span-6">
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.password.newpassword')}}</label>
                                    <div class="w-full inline-flex border dark:border-gray-500">
                                        <input
                                            type="password"
                                            class="w-full dark:bg-gray-800 dark:hover:bg-gray-700 p-2 "
                                            :placeholder="$t('setting.password.newpassword')"
                                            v-model="user.password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.password.reenternewpassword')}}</label>
                                    <div class="w-full inline-flex border dark:border-gray-500">
                                        <input
                                            type="password"
                                            class="w-full dark:bg-gray-800 dark:hover:bg-gray-700 p-2 "
                                            :placeholder="$t('setting.password.reenternewpassword')"
                                            v-model="user.passwordConfirm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.password.oldpassword')}}</label>
                                    <div class="w-full inline-flex border dark:border-gray-500">
                                        <input
                                            type="password"
                                            class="w-full dark:bg-gray-800 dark:hover:bg-gray-700 p-2 "
                                            :placeholder="$t('setting.password.oldpassword')"
                                            v-model="user.oldPassword"
                                        />
                                    </div>
                                </div>
                                <div class="pt-4 text-red-300 dark:text-red-400" v-if="errors2.length">
                                <b>{{ $t('setting.validmessage.correcterrors')}}</b>
                                <ul>
                                <li v-for="err in errors2" :key="err">{{ err }}</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div class="border-b dark:border-gray-600" ></div>
                        <div class="grid grid-cols-8 gap-6 space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center  dark:text-gray-300">
                            <h2 class="col-span-2">隱私</h2>
                            <div class="col-span-6">
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.privacy.online.status')}}</label>
                                    <div class="w-full inline-flex ">
                                        <div class="bg-gray-200 dark:bg-gray-600 text-sm text-gray-500 dark:text-gray-200 dark:hover:text-gray-200 leading-none border-2 border-gray-200 rounded-full inline-flex dark:border-gray-500">
                                            <button @click="onlineStatus('SHOW')" id="onlineStatusSHOW" class="onlineStatus gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-r-full px-4 py-2 active-tab dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'check-circle']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">{{ $t('setting.privacy.online.show')}}</span>
                                            </button>
                                            <button @click="onlineStatus('NOTSHOW')" id="onlineStatusNOTSHOW" class="onlineStatus gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2  dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'times-circle']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">{{ $t('setting.privacy.online.notshow')}}</span>
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400">{{ $t('setting.privacy.favrite.status')}}</label>
                                    <div class="w-full inline-flex ">
                                        <div class="bg-gray-200 dark:bg-gray-600 text-sm text-gray-500 dark:text-gray-200 dark:hover:text-gray-200 leading-none border-2 border-gray-200 rounded-full inline-flex dark:border-gray-500">
                                            <button @click="showFavourite('SHOW')" id="showFavouriteSHOW" class="showFavourite gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-r-full px-4 py-2 active-tab dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'check-circle']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">{{ $t('setting.privacy.favrite.show')}}</span>
                                            </button>
                                            <button @click="showFavourite('NOTSHOW')" id="showFavouriteNOTSHOW" class="showFavourite gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2 dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'times-circle']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">{{ $t('setting.privacy.favrite.notshow')}}</span>
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label class="text-sm text-gray-400">顯示關注用戶</label>
                                    <div class="w-full inline-flex ">
                                        <div class="bg-gray-200 dark:bg-gray-600 text-sm text-gray-500 dark:text-gray-200 dark:hover:text-gray-200 leading-none border-2 border-gray-200 rounded-full inline-flex dark:border-gray-500">
                                            <button @click="showLikedUser('SHOW')" id="showLikedUserSHOW" class="showLikedUser gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-r-full px-4 py-2 active-tab dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'check-circle']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">顯示</span>
                                            </button>
                                            <button @click="showLikedUser('NOTSHOW')" id="showLikedUserNOTSHOW" class="showLikedUser gap-2 inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2  dark:text-gray-200 dark:hover:text-gray-200 ">
                                            <font-awesome-icon
                                                :icon="['fas', 'times-circle']"
                                                class="cursor-pointer "
                                            />
                                            <span class="dark:text-gray-200 dark:hover:text-gray-200 ">不顯示</span>
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div class="border-b dark:border-gray-600" ></div>
                        <div class="grid grid-cols-8 w-full p-4 text-gray-500 items-center  dark:text-gray-300">
                            <div class="col-span-8 text-right">
                            <button
                                class="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                                type="submit"
                            >
                                保 存
                            </button>
                            <button
                                class="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                                type="button"
                                @click="$router.go(-1)"
                            >
                                返 回
                            </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            <div class="col-span-4 ">
                <div class="shadow rounded bg-gray-100 dark:bg-zinc-900 dark:text-zinc-100">
                    <div class="w-full flex group">
                        <div class="flex-none p-4">
                            <img :src="image|picFullUrl" class="h-20 w-20 border-2 border-double border-gray-400  rounded-full object-right-top" v-if="image"/>  
                            <img src="~/assets/images/noavatar.jpg" aria-placeholder="默認頭像" class="h-20 w-20 border-2 border-double border-gray-400  rounded-full object-right-top" v-else/>
                        </div>
                        <div class="flex-grow flex flex-col px-2 py-4">
                            <div class="flex flex-wrap content-center pb-2">
                                <div class="text-2xl break-all">{{user.showname}}</div>
                            </div>
                            <div class=" inline-flex items-center text-gray-700 dark:text-zinc-200">
                                <font-awesome-icon
                                        :icon="['fas', 'dot-circle']"
                                        class="cursor-pointer h-2 text-green-600"
                                        v-if="user.onlineStatus == 'SHOW'"
                                    /> 
                                <div>{{ $t('setting.membernumber', {number:user.id}) }}, {{ $t('setting.memberjointime')}} {{user.createDate | formatDate('yyyy-MM-dd')}} ({{user.createDate | diffDays()}} {{ $t('common.ago')}})</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
  /*@apply bg-white text-blue-400 rounded-full;*/
  .active-tab {background: white; border-radius: 9999px; color: #4e4e4e;}
  .dark .active-tab {background: #2d3748; border-radius: 9999px; color: white;}
</style>
<script>
    import authorizationAPI from "../api/auth";
    import userAPI from "../api/user";
    import emailAPI from "../api/email";
    import $ from "../plugins/jquery.min";
    import { Cropper } from 'vue-advanced-cropper';
    import { Toast } from "../plugins/sweetalert2";
    import { mapState} from "vuex";
    export default {
        components: {
            Cropper
        },
        data() {
            return {
                errors1: [],
                errors2: [],
                errors3: [],
                isProcessing: false,
                user: {
                },
                image: '',
                img: '',
                coordinates: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                },
                collected: [],
                needSave: false,
                fil: null,
                activeTab: 0,
            };
        },
        computed: {
            ...mapState(["currentUser", "isAuthenticated"]),
        },
        async activated() {
            await this.fetchInfo();
            this.userGender(this.user.gender);
            this.showJoinTeam(this.user.showJoinTeam);
            this.showPublishTopic(this.user.showPublishTopic);
            this.showCreatedCCP(this.user.showCreatedCCP);
            this.showFavourite(this.user.showFavourite);
            this.showLikedUser(this.user.showLikedUser);
        },
        methods: {
            async fetchInfo() {
                this.isProcessing = true;
                try {
                    const res = await authorizationAPI.info();
                    const { data, statusText, status } = res;
                    if (statusText !== "OK") {
                        throw new Error(statusText);
                    }
                    this.isProcessing = false;
                    this.user = data;
                    this.image = data.avatar?data.avatar.path:null;
                    
                } catch (error) {
                    this.isProcessing = false;
                    console.error(error);
                    Toast.fire({
                    icon: "error",
                    title: "無法获取，請稍後再試",
                    });
                }
            },
            change({ coordinates, canvas }) {
                console.log(coordinates, canvas);
            },
            loadImage(event) {
                // Reference to the DOM input element
                var input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.img = e.target.result;
                    };
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                    
                }
            },
            
            showTeam(id) {
                this.$router.push("/team/"+id);
            },
            async handleSubmit() {
                this.errors1 = [];
                if (!!this.user && !!this.user.email && !this.validEmail(this.user.email)) {
                    const validEmail = this.$t('setting.validmessage.email');
                    this.errors1.push(validEmail);
                }
                this.errors2 = [];
                console.info('password == ', this.user.password, this.user.passwordConfirm);
                const p1 = this.user.password || '';
                const p2 = this.user.passwordConfirm || '';
                const np = this.user.oldPassword || '';
                if (!!this.user && p1 !== p2) {
                    const passwordNotMatch = this.$t('setting.validmessage.passwordNotMatch');
                    this.errors2.push(passwordNotMatch);
                }
                if (!!this.user && !np && p1.length && p2.length && p1 === p2) {
                    const oldpasswordRequired = this.$t('setting.validmessage.oldpasswordRequired');
                    this.errors2.push(oldpasswordRequired);
                }
                if (this.errors1.length || this.errors2.length || this.errors3.length) {
                    return;
                }
                try {
                    const { data, statusText, status } = await userAPI.setting(this.user);
                    if (status == 200) {
                        Toast.fire({
                        icon: "success",
                        title: "更新成功",
                        });
                        this.$router.push("/setting");
                    }
                } catch (error) {
                    Toast.fire({
                        icon: "error",
                        title: "無法保存，請稍後再試",
                    });
                }
            },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            userGender(val) {
                $('.userGender').removeClass('active-tab');
                $('#userGender'+val).addClass('active-tab');
                this.user.gender = val;
            },
            onlineStatus(val) {
                $('.onlineStatus').removeClass('active-tab');
                $('#onlineStatus'+val).addClass('active-tab');
                this.user.onlineStatus = val;
                console.info(val);
            },
            showJoinTeam(val) {
                $('.showJoinTeam').removeClass('active-tab');
                $('#showJoinTeam'+val).addClass('active-tab');
                this.user.showJoinTeam = val;
            },
            showPublishTopic(val) {
                $('.showPublishTopic').removeClass('active-tab');
                $('#showPublishTopic'+val).addClass('active-tab');
                this.user.showPublishTopic = val;
            },
            showCreatedCCP(val) {
                $('.showCreatedCCP').removeClass('active-tab');
                $('#showCreatedCCP'+val).addClass('active-tab');
                this.user.showCreatedCCP = val;
            },
            showFavourite(val) {
                $('.showFavourite').removeClass('active-tab');
                $('#showFavourite'+val).addClass('active-tab');
                this.user.showFavourite = val;
            },
            showLikedUser(val) {
                $('.showLikedUser').removeClass('active-tab');
                $('#showLikedUser'+val).addClass('active-tab');
                this.user.showLikedUser = val;
            },
            async sendActiveEmail() {
                if (!!this.user.email && this.validEmail(this.user.email)) {
                    $('#sendActiveEmailButton').prop('disabled', true);
                    this.user.emailStatus = 'SENTCODE';
                    Toast.fire({
                        icon: "warning",
                        title: "验证码正在通过邮件发送, 请查收您的邮箱",
                        timer: 3000,
                        timerProgressBar: true
                    });
                    const res = await emailAPI.sendActiveEmail(this.user.email);
                    console.info('sent email ', res);
                    if (res.data) {
                        Toast.fire({
                            icon: "success",
                            title: "验证码已通过邮件发送",
                        });
                    }
                }
            }
        }
    }
</script>