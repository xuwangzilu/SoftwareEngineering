<template>
  <div style="background-color: #409EFF; height: 60px">
    <el-row>
      <el-col :span="8">
        <el-space>
          <h2 style="color: white; margin-top: 10px">同济大学二手交易平台</h2>
        </el-space>
      </el-col>
      <!--未登录状态的导航栏-->
      <el-col :offset="11" :span="5">
        <el-menu v-if="loginStatus===false" default-active='/home' mode="horizontal" background-color="#409EFF"
                 text-color="#fff" active-text-color="#ffd04b" style="border-bottom: 0" router>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/login">登录/注册</el-menu-item>
      </el-menu>
      <!--已登录状态的导航栏-->
        <el-menu v-else :default-active="$route.path" mode="horizontal" background-color="#409EFF"
                 text-color="#fff" active-text-color="#ffd04b" style="border-bottom: 0" router>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-submenu>
          <template #title>个人中心</template>
          <el-menu-item index="/info">信息管理</el-menu-item>
          <el-menu-item index="/history">浏览记录</el-menu-item>
          <el-menu-item index="/favorite">收藏夹</el-menu-item>
          <el-menu-item index="/security">账号安全</el-menu-item>
        </el-submenu>
        <el-menu-item index="/logout" @click="logOut">注销</el-menu-item>       
      </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
export default{
  data(){
      return{
      activeIndex: '',
      loginStatus: false,
      }
  },
  created(){
    this.getLoginStatus();
  },

  methods:{
    logOut(){
      //设置登录状态为false
      window.sessionStorage.setItem('uid','0');
      ElMessage.success('注销成功!');
      this.loginStatus=false;
    },

    getLoginStatus() {
      let status = window.sessionStorage.getItem('uid')
      switch (status) {
        case null:
          window.sessionStorage.setItem('uid', '0')
          break
        case '0':
          break
        //若用户id不为0，则设定登录状态为true
        default:
          this.loginStatus = true
          break
      }
    },
  },
}
</script>