<template>
  <!--用户的侧栏-->
  <el-menu v-if="character==='user'" :default-active="$route.path" background-color="#545c64" ref="menu"
           text-color="#fff" active-text-color="#ffd04b" style="border-right: 0" :unique-opened="true" router>
    <el-menu-item index="/info">
      <i class="el-icon-menu"></i>
      <template #title>用户主页</template>
    </el-menu-item>
    <el-menu-item index="/shoppingcart">
      <i class="el-icon-shopping-cart-2"></i>
      <template #title>购物车</template>
    </el-menu-item>
    <el-menu-item index="/order">
      <i class="el-icon-document"></i>
      <template #title>订单管理</template>
    </el-menu-item>
    <el-menu-item index="/goods">
      <i class="el-icon-goods"></i>
      <template #title>商品管理</template>
    </el-menu-item>
    <el-menu-item index="/stream">
      <i class="el-icon-coin"></i>
      <template #title>流水统计</template>
    </el-menu-item>
  </el-menu>
  <!--管理员的侧栏-->
  <el-menu v-if="character==='admin'" :default-active="$route.path" background-color="#545c64"
           text-color="#fff" active-text-color="#ffd04b" style="border-right: 0" router>
    <el-menu-item index="/admin/examine">
      <i class="el-icon-menu"></i>
      <template #title>审核</template>
    </el-menu-item>
    <el-menu-item index="/admin/report">
      <i class="el-icon-message"></i>
      <template #title>受理举报</template>
    </el-menu-item>
  </el-menu>
</template>


<script>
export default {
  components:{

  },

  data() {
    return {
      character: 'user',
      activeIndex: '',
    }
  },
  created() {
    this.getCharacter()
  },
  methods: {
    getCharacter() {
      let path = this.$route.path
      this.character = path.substring(1,6)
      if(this.character!='admin'){
        this.character='user';
      }
      //console.log(character, tail)
    },
  },
}
</script>


<style scoped>

</style>