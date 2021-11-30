<template>
<div :style ="bg">
  <!--登录窗口-->
  <el-card v-if="isRegistered" style="margin-left: 33%; margin-right: 33%; margin-top: 10%;background-color: rgba(255,255,255,0.6)">
    <el-page-header @back="$router.push('/home')" title="返回首页">
      <el-button type="primary" plain size="small">忘记密码</el-button>
    </el-page-header>
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
        <el-input v-model="loginForm.account" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startRegister" style="width: 32%">注册</el-button>
        <el-button type="success" @click="logIn(loginForm)" style="width: 32%">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!--注册窗口-->
  <el-card v-else style="margin-left: 33%; margin-right: 33%; margin-top: 10%;background-color: rgba(255,255,255,0.5)">
    <el-page-header @back="$router.push('/home')" title="返回首页"/>
    <h2>用户注册</h2>
    <el-form :model="registerForm" status-icon ref="registerForm" label-width="80px"
              style="margin-left: 7%; margin-right: 13%" :rules="rules">
      <el-form-item label="账号" prop="newAccount">
        <el-input v-model="registerForm.newAccount"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newPassword">
        <el-input v-model="registerForm.newPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm">
        <el-input v-model="registerForm.confirm" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="register(registerForm)" style="width: 48%">完成</el-button>
        <el-button type="danger" @click="cancelRegister" style="width: 48%">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import {ElMessage} from 'element-plus'
export default {
  data(){
    //登录账户验证规则
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    //登录密码验证规则
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    //注册账户验证规则
    const validateNewAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      }
      else {
        let isUsed = false
        //调用接口+ 给账号密码，返回是否有相同账号
          if(isUsed) {
            callback(new Error('该用户名已存在!'));
          }
          else {
            callback();
          }
      }
    };
    //注册密码验证规则
    const validateNewPassword = (rule, value, callback) => {
      const regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
      const regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value.length < 8) {
        callback(new Error('密码应不少于8位'));
      } else if (value.length > 20) {
        callback(new Error('密码应不超过20位'));
      } else if (!regNumber.test(value) || !regString.test(value)) {
        callback(new Error('密码应同时包含数字与字母'));
      } else {
        callback();
      }
    };
    //注册密码再次输入验证
    const validateConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    //完善姓名验证规则
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的姓名'));
      } else {
        callback();
      }
    };
    //完善性别验证规则
    const validateGender = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择您的性别'));
      } else {
        callback();
      }
    };
    //完善生日验证规则
    const validateBirthday = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择您的生日'));
      } else {
        callback();
      }
    };
    //完善学号验证规则
    const validateIDNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的学号'))
      }
      else if(value.length !== 7) {
        callback(new Error('学号应为7位'))
      }
      else {
        callback();
      }
    };
    return{
      bg:{  //登录页面的背景样式
        backgroundImage:"url(" + require("../assets/lib.jpg") + ")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100%",
        height:"700px",
        border:"white 1px solid",
      },
      isRegistered:true,
      loginForm:{  //登录表单
        type:'用户',
        account:'',
        password:'',
      },
      registerForm: {   //注册表单
        newAccount: '',
        newPassword: '',
        confirm: '',
      },
      moreInfo:false,
      rules:{  //表单验证规则
        account: [{ validator: validateAccount, trigger: 'blur'}],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        newAccount: [{ validator: validateNewAccount, trigger: 'blur'}],
        newPassword: [{ validator: validateNewPassword, trigger: 'blur' }],
        confirm: [{ validator: validateConfirm, trigger: 'blur' }],
        name: [{ validator: validateName, trigger: 'blur' }],
        gender: [{ validator: validateGender, trigger: 'blur' }],
        birthday: [{ validator: validateBirthday, trigger: 'blur' }],
        IDNumber: [{ validator: validateIDNumber, trigger: 'blur' }],
      }
    }
  },
  methods:{
    //用户登录分流
    logIn(form){
      this.$refs['loginForm'].validate((valid)=>{
        if(valid){
          switch(form.type){
            case '用户':
              this.userLogin(form.account,form.password)
              break
            case '管理员':
              this.adminLogin(form.account,form.password)
              break
          }
        }else{
          return false;
        }
      })
    },
    //用户登录
    userLogin(account,password){
      console.log(account,password);
      //调用接口：传入账号密码，返回是否正确、用户ID
      let uid;
      if(uid === -1){
        ElMessage.error('用户名或密码错误！')
      }else{
        ElMessage.success('用户登录成功！')
        window.sessionStorage.setItem('uid',uid)
        this.$router.push('/home')
      }
    },
    //管理员登录
    adminLogin(account,password){
      console.log(account,password);
      //调用接口：传入账号密码，返回是否正确、管理员ID
      let uid;
      if(uid === -1){
        ElMessage.error('管理员ID或密码错误！')
      }else{
        ElMessage.success('管理员登录成功！')
        window.sessionStorage.setItem('uid',account)
        this.$router.push('/admin/examine')
      }
    },
    startRegister(){
      this.isRegistered=false;
    },
    register(form){
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
              console.log(form);
              this.moreInfo = true
              ElMessage.success('注册成功！请进一步完善您的信息！')
        }else {
          return false
        }
      });
    },
    cancelRegister(){
      this.isRegistered=true;
      this.registerForm={
        newAccount: '',
        newPassword: '',
        confirm: '',
      };
    },
  }
}
</script>

<style scoped>

</style>