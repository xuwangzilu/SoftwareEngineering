<template>
<div style="
        background-image: url(//s2.hdslb.com/bfs/static/blive/blfe-dynamic-web/static/img/background.bc725153.png);
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size:100% 100%;">
  <el-container>
    <el-header style="padding: 0">
      <TopNav />
    </el-header>
    <el-main>
    <!--此处写代码-->
    
    </el-main>
    <el-footer style="background-color: #f6f9fa; height:100%">
    <p style="margin:0px; padding:30px 0px 40px 0px">
      Copyright ©2021 同济大学校内二手交易平台
    </p>
  </el-footer>
  </el-container>
</div>
</template>

<script>
import TopNav from "../components/TopNav"
export default {
    components:{
        TopNav,
    },
    data(){
        return{

        }
    },
    methods:{

    },
}
</script>