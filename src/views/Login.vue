<template>
<div :style ="bg">
  <el-header style="padding: 0">
  </el-header>
  <!--登录窗口-->
  <el-card style="margin-left: 42%;margin-right:42%;margin-top:15%;">
    <el-form :model="loginForm" status-icon ref="loginForm" label-width="40px" :rules="rules">
    <el-form-item label="密码" prop="password" style="font-color:white">
      <el-input v-model="loginForm.password" show-password @keydown.enter="logIn(loginForm.password)"></el-input>
    </el-form-item> 
    <el-form-item label-width="10px">
      <el-button type="success" @click="logIn(loginForm.password)"  style="width: 48%;margin-bottom: 0px;margin-top: 0px">登录</el-button>
    </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import {ElMessage} from 'element-plus'
export default {
  data(){
    //登录密码验证规则
    const validatePassword = (rule,value,callback) =>{
      if(value===''){
        callback(new Error('密码为：12345'));
      }else{
        callback();
      }
    };
    return{
      bg:{  //登录页面的背景样式
        backgroundImage:"url(" + require("../assets/bg.jpg") + ")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100%",
        height:"700px",
        border:"white 1px solid",
      },
      loginForm:{  //登录表单
        password:'',
      },
      rules:{  //表单验证规则
        password:[{validator:validatePassword,trigger:'blur'}]
      }
    }
  },
  methods:{
    logIn(pwd){
      //判断输入密码是否正确
      if(pwd==='12345'){
        ElMessage.success('登录成功!')
        window.sessionStorage.setItem('uid','1')
        this.$router.push('/home')
      } else{
        ElMessage.error('密码为12345!')
      }
    },
  }
}
</script>

<style scoped>

</style>