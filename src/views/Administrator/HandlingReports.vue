<template>
 <el-header height="120px">
    <div class="upheader">
      <router-link to="/personalpage">
       <i class="el-icon-s-custom" id="personinfo">账户信息</i>
        </router-link>

      <router-link to="/Login">
        <i class="el-icon-switch-button" id="returnLogin">退出登录</i>
      </router-link>
      <div class="logo margin1">
        ADMINISTRATOR
        </div>

    </div>
    <el-menu
      class="el-menu margin1"
      mode="horizontal"
      background-color="#003680"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      
      <el-menu-item index="1"
        ><router-link to="/admin/handle">受理举报</router-link></el-menu-item
      >
      
    </el-menu>
  </el-header>
  

</template>

<script>

export default {
    components:{
        
    },
    data(){
        return{

        }
    },
    methods:{

    },
}
</script>

<style scoped>

.el-header {
  background-color: #003680;
  color: white;
}

.upheader {
  height: 60px;
}
a:link {
  text-decoration: none;
  color: white;
}

a:visited {
  color: white;
}

.margin1 {
  margin-left: 5%;
}
.logo {
  width: 300px;
  height: 60px;
  font-family: "Microsoft YaHei";
  font-size: 38px;
  text-align: left;
  line-height: 60px;
  text-indent: 1em;
  float: left;
}
#personinfo{
  position: absolute;
  top: 80px;
  right: 30px;
}
#returnLogin{
  position: absolute;
  top: 100px;
  right: 30px;
}

</style>
