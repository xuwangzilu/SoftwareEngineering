<template>
<div :style ="bg">
  <!--登录窗口-->
  <el-card v-if="isRegistered&&!findPassword" style="margin-left: 33%; margin-right: 33%; margin-top: 10%;background-color: rgba(255,255,255,0.6)">
    <el-page-header @back="$router.push('/home')" title="返回首页">
    </el-page-header>
    <h2>用户登录</h2>
    <el-form :model="loginForm" status-icon ref="loginForm" label-width="100px"
              style="margin-left: 7%; margin-right: 10%" :rules="rules">
      <el-form-item label="类型" prop="type" style="text-align:left;">
        <el-radio-group v-model="loginForm.type" style="margin-left:20px;">
          <el-radio-button label="用户"></el-radio-button>
          <el-radio-button label="管理员"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账号" prop="IDNumber" style="text-align:left;">
        <el-input v-model="loginForm.IDNumber" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="text-align:left;">
        <el-input v-model="loginForm.password" show-password style="width: 200px;padding: 0px;margin-right: 10px;"></el-input>
        <el-button v-if="loginForm.type==='用户'" type="text" size="medium" @click="startFindPassword()" style="color:#4169E1;">忘记密码?</el-button>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-button type="primary" @click="startRegister" style="width: 32%">注册</el-button>
        <el-button type="success" @click="logIn(loginForm)" style="width: 32%">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!--注册窗口-->
  <el-card v-else-if="!isRegistered&&!moreInfo" style="margin-left: 33%; margin-right: 33%; margin-top: 5%;background-color: rgba(255,255,255,0.5)">
    <el-page-header @back="cancelRegister()" title="取消注册"/>
    <h2>用户注册</h2>
    <el-form :model="registerForm" status-icon ref="registerForm" label-width="80px"
              style="margin-left: 13%; margin-right: 13%" :rules="rules">
      <el-form-item label="学号" prop="newIDNumber" style="text-align:left;">
        <el-input v-model="registerForm.newIDNumber" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>   
      <el-form-item label="姓名" prop="name" style="text-align:left;">
        <el-input v-model="registerForm.name" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newPassword" style="text-align:left;">
        <el-input v-model="registerForm.newPassword" show-password style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm" style="text-align:left;">
        <el-input v-model="registerForm.confirm" show-password style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telNum" style="text-align:left;">
        <el-input v-model="registerForm.telNum" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="CAPTCHA" style="text-align:left;">
        <el-input v-model="registerForm.CAPTCHA" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-button type="primary" @click="nextStage()" style="width: 32%">下一步</el-button>
        <el-button type="success" @click="getCAPTCHA('registerForm')" style="width: 40%">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!--用户注册的其他信息-->
  <el-card v-else-if="!isRegistered&&moreInfo" style="margin-left: 33%; margin-right: 33%; margin-top: 10%;background-color: rgba(255,255,255,0.5)">
    <el-page-header @back="lastStage()" title="上一步"/>
    <h2>完善用户信息</h2>
    <el-form :model="infoForm" ref="infoForm" status-icon label-width="100px"
              style="margin-left: 7%; margin-right: 13%; text-align: left" :rules="rules">
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="infoForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学院" prop="school" filterable>
      <el-select v-model="infoForm.school" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
            v-model="infoForm.birthday"
            type="date"
            placeholder="选择您的生日"
            format="YYYY 年 MM 月 DD 日"
            value-format="YYYY-MM-DD">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-button type="success" @click="completeRegister()" style="width: 48%;margin-left: 30px;">完成注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!--找回密码窗口-->
  <el-card v-else-if="findPassword&&!nextPwd" style="margin-left: 33%; margin-right: 33%; margin-top: 10%;background-color: rgba(255,255,255,0.5)">
    <el-page-header @back="cancelFind()" title="返回"/>
    <h2>找回密码</h2>
    <el-form :model="findForm" status-icon ref="findForm" label-width="80px"
              style="margin-left: 13%; margin-right: 13%" :rules="rules">
      <el-form-item label="学号" prop="newIDNumber" style="text-align:left;">
        <el-input v-model="findForm.newIDNumber" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>   
      <el-form-item label="手机号" prop="telNum" style="text-align:left;">
        <el-input v-model="findForm.telNum" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="CAPTCHA" style="text-align:left;">
        <el-input v-model="findForm.CAPTCHA" style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-button type="primary" @click="findNextStage()" style="width: 32%">下一步</el-button>
        <el-button type="success" @click="getCAPTCHA('findForm')" style="width: 40%">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!--修改密码窗口-->
  <el-card v-else-if="findPassword&&nextPwd" style="margin-left: 33%; margin-right: 33%; margin-top: 10%;background-color: rgba(255,255,255,0.5)">
    <el-page-header @back="cancelFind()" title="取消修改"/>
    <h2>找回密码</h2>
    <el-form :model="newPwdForm" status-icon ref="newPwdForm" label-width="80px"
              style="margin-left: 13%; margin-right: 13%" :rules="rules">
      <el-form-item label="新密码" prop="newPassword" style="text-align:left;">
        <el-input v-model="newPwdForm.newPassword" show-password style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm" style="text-align:left;">
        <el-input v-model="newPwdForm.confirm" show-password style="width: 200px;padding: 0px;"></el-input>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-button type="success" @click="modifyPassword(newPwdForm)" style="width: 32%;margin-left:55px;">完成</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import { h } from 'vue'
import { ElNotification,ElMessage } from 'element-plus';
export default {
  created(){
    ElNotification({
      title: '测试规范',
      message: h('i', { style: 'color: teal' }, '普通用户账号长7位,密码包含字母和数字、8-20位即可;管理员账号长4位,密码同上即可;手机号码长11位,验证码长6位即可。'),
    })
  },
  data(){
    //登录密码验证规则
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
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
    //完善学号验证规则
    const validateIDNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的账号'))
      }
      else if(value.length !== 7&&this.loginForm.type==='用户') {
        callback(new Error('用户账号应为7位'))
      }else if(value.length !== 4&&this.loginForm.type==='管理员'){
        callback(new Error('管理员账号应为4位'))
      }else {
        callback();
      }
    };
    //完善注册学号验证规则
    const validateNewIDNumber = (rule, value, callback) => {
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
    //完善手机号验证规则
    const validateTelNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的手机号码'))
      }
      else if(value.length !== 11) {
        callback(new Error('手机号码格式错误'))
      }
      else {
        callback();
      }
    };
    //完善验证码验证规则
    const validateCAPTCHA = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      }
      else if(value.length !== 6) {
        callback(new Error('验证码格式错误'))
      }
      else {
        callback();
      }
    };
    //完善学院验证规则
    const validateSchool = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择您所属的学院'));
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
        IDNumber:'',
        password:'',
      },
      registerForm: {   //注册表单
        newIDNumber:'',
        newPassword: '',
        confirm: '',
        name:'',
        telNum:'',
        CAPTCHA:'',
      },
      moreInfo:false,
      infoForm:{  //详细信息表单
        gender:'',
        school:'',
        birthday:'',
      },
      options: [
        {
          value: '软件学院',
          label: '软件学院',
        },
        {
          value: '汽车学院',
          label: '汽车学院',
        },
        {
          value: '艺术与传媒学院',
          label: '艺术与传媒学院',
        },
        {
          value: '材料学院',
          label: '材料学院',
        },
        {
          value: '机械与能源工程学院',
          label: '机械与能源工程学院',
        },
      ],
      findPassword:false,
      findForm:{  //找回密码表单
        newIDNumber:'',
        telNum:'',
        CAPTCHA:'',
      },
      nextPwd:false,
      newPwdForm:{  //新密码表单
        newPassword:'',
        confirm:'',
      },
      rules:{  //表单验证规则
        IDNumber: [{ validator: validateIDNumber, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        newIDNumber: [{ required: true,validator: validateNewIDNumber, trigger: 'blur'}],
        newPassword: [{ required: true,validator: validateNewPassword, trigger: 'blur' }],
        confirm: [{ required: true,validator: validateConfirm, trigger: 'blur' }],        
        name: [{ required: true,validator: validateName, trigger: 'blur' }],
        telNum: [{ required: true,validator: validateTelNum, trigger: 'blur' }],  
        CAPTCHA: [{ validator: validateCAPTCHA, trigger: 'blur' }],  
        gender: [{ required: true,validator: validateGender, trigger: 'change' }],
        school: [{ required: true,validator: validateSchool, trigger: 'change' }],
        birthday: [{ required: true,validator: validateBirthday, trigger: 'change' }],        
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
              this.userLogin(form.IDNumber,form.password)
              break
            case '管理员':
              this.adminLogin(form.IDNumber,form.password)
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
        //使用学号'1234567'作为测试
        uid='1234567';
        window.sessionStorage.setItem('uid',uid);
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
        window.sessionStorage.setItem('uid',account);
        this.$router.push('/admin/examine')
      }
    },
    //开始用户注册
    startRegister(){
      this.isRegistered=false;
    },
    //获取验证码
    getCAPTCHA(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调用接口：传入（手机号码） 返回（验证码）
          
        }else {
          return false
        }
      });
    },
    //完善信息
    nextStage(){
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.moreInfo = true
        }else {
          return false
        }
      });
    },
    //返回
    lastStage(){
      this.moreInfo = false;
    },
    //取消注册
    cancelRegister(){
      this.isRegistered=true;
      this.registerForm={
        IDNumber:'',
        newPassword: '',
        confirm: '',
        name:'',
        telNum:'',
        CAPTCHA:'',
      };
      this.infoForm={
        gender:'',
        school:'',
        birthday:'',
      };
    },
    //注册完毕
    completeRegister(){
      this.$refs['infoForm'].validate((valid) => {
        if (valid) {
          //调用接口：传入（用户信息:registerForm+infoForm） 返回（注册结果）

          //自动登录，并跳转到主页，此处'1'后期应改为用户学号
          ElMessage.success('注册成功,1秒后将为您自动登录...');
          window.sessionStorage.setItem('uid','1234567');
          setTimeout(() => {
            this.$router.push('/home')
          }, 1000)
        }else {
          return false
        }
      });
    },
    //开始找回密码
    startFindPassword(){
      this.findPassword=true;
    },
    //取消找回密码
    cancelFind(){
      this.findPassword=false;
      this.nextPwd=false;
      this.findForm={
        newIDNumber:'',
        telNum:'',
        CAPTCHA:'',
      };
      this.newPwdForm={
        newPassword:'',
        confirm:'',
      }
    },
    //开始修改密码
    findNextStage(){
      this.$refs['findForm'].validate((valid) => {
        if (valid) {
          this.nextPwd=true;
        }else {
          return false
        }
      });
    },
  }
}
</script>

<style scoped>

</style>