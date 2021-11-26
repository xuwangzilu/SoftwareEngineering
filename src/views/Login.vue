<template>
<div :style ="bg">
  <!--登录窗口-->
  <el-card v-if="isRegistered" style="margin-left: 33%; margin-right: 33%; margin-top: 10%;background-color: rgba(255,255,255,0.5)">
    <el-page-header @back="$router.push('/home')" title="返回首页"/>
    <h2>用户登录</h2>
    <el-form :model="loginForm" status-icon ref="loginForm" label-width="80px"
              style="margin-left: 7%; margin-right: 13%" :rules="rules">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="loginForm.type" >
          <el-radio-button label="用户"></el-radio-button>
          <el-radio-button label="管理员"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startRegister" style="width: 48%">注册</el-button>
        <el-button type="success" @click="logIn(loginForm)" style="width: 48%">登录</el-button>
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
        backgroundImage:"url(" + require("../assets/village.jpg") + ")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100%",
        height:"700px",
        border:"white 1px solid",
      },
      isRegistered:true,
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