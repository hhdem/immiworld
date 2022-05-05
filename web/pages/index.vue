<template>
  <div class=" max-w-screen-lg mx-auto pt-4">
    <div class="row">
      <div class="col-md-12 pl-0">
        <div class="container dark:text-gray-300 justify-center text-center h-24 content-center place-content-center align-middle">
          <font-awesome-icon
            :icon="['fas', 'star']"
            class="cursor-pointer text-gray"
          />
          首页
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created:function(){
    console.info('index page creaedt ');
    // this.$router.push(this.localePath('news')); // 页面加载时跳转
  }
};

</script>
