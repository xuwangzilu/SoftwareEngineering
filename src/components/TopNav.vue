<template>
  <div style="background-color: #3399CC; height: 60px">
    <el-row>
      <el-col :span="8">
        <el-space>
          <h2 style="color: white; margin-top: 10px">同济大学二手交易平台</h2>
        </el-space>
      </el-col>
      <el-col :offset="7" :span="9">
        <!--未登录状态的导航栏-->
        <el-menu v-if="loginStatus===false" default-active='/home' mode="horizontal" background-color="#3399CC"
                 text-color="#fff" active-text-color="#FFFFCC" style="border-bottom: 0;margin-left: 200px;" router>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/login">登录/注册</el-menu-item>
        </el-menu>
        <!--用户登录状态的导航栏-->
        <el-menu v-else-if="userType==='user'" :default-active="$route.path" mode="horizontal" background-color="#3399CC"
                 text-color="#fff" active-text-color="#FFFFCC" style="border-bottom: 0" router :unique-opened="true">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-submenu index="0">
          <template #title>个人中心</template>
            <el-menu-item index="/info">用户信息</el-menu-item>
            <el-menu-item index="/security">账号安全</el-menu-item>
        </el-submenu>
        <el-submenu index="1">
          <template #title>浏览管理</template>
            <el-menu-item index="/shoppingcart">购物车</el-menu-item>
            <el-menu-item index="/favorite">收藏夹</el-menu-item>
            <el-menu-item index="/history">浏览记录</el-menu-item>
        </el-submenu>        
        <el-submenu index="2">
          <template #title>我的交易</template>
            <el-menu-item index="/order">订单管理</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/stream">流水统计</el-menu-item>
            <el-menu-item index="/chat">我的消息</el-menu-item>
        </el-submenu>        
        <el-menu-item @click="logOut">注销</el-menu-item>       
      </el-menu>
      <!--管理员登录状态的导航栏-->
      <el-menu v-else :default-active="$route.path" mode="horizontal" background-color="#3399CC"
                text-color="#fff" active-text-color="#FFFFCC" style="border-bottom: 0;margin-left: 100px;" router>
      <el-menu-item index="/home">首页</el-menu-item>
        <el-submenu>
          <template #title>管理员中心</template>
          <el-menu-item index="/admin/examine">审核</el-menu-item>
          <el-menu-item index="/admin/report">受理举报</el-menu-item>
        </el-submenu>
        <el-menu-item @click="logOut">注销</el-menu-item>       
      </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";
export default {
  data(){
      return{
      activeIndex: '',
      loginStatus: false,
      userType:'user',
      }
  },
  created(){
    this.getLoginStatus();
  },

  methods:{
    logOut(){
      //对话框询问
      ElMessageBox.confirm(
        '您的账号将注销登录,是否继续操作?',
        '确认',
        {
          confirmButtonText:'继续',
          cancelButtonText:'取消',
          type:'warning',
        }
      ).then(()=>{
        //设置登录状态为false
        window.sessionStorage.setItem('uid','0');
        this.loginStatus=false;
        this.$router.push('/home');
        ElMessage({
          type:'success',
          message:'注销成功!',
        });
      }).catch(()=>{
        ElMessage({
          type:'info',
          message:'取消注销',
        });
      })
    },

    getLoginStatus() {
      let status = window.sessionStorage.getItem('uid')
      console.log(status);
      switch (status) {
        case null:
          window.sessionStorage.setItem('uid', '0')
          break
        case '0':
          break
        case undefined:
          window.sessionStorage.setItem('uid', '0')
          break
        //若用户id不为0，则设定登录状态为true
        default:
          this.loginStatus = true
          if(status.length!=7){
            this.userType='admin';
          }
          break
      }
    },
  },
}
</script>

<style scoped>

</style>