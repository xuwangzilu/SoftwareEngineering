<template>
<div style="background-color:#F5F5F5;">
  <el-container>
    <el-header style="padding: 0">
      <BackNav />
    </el-header>
    <el-main>
      <el-tabs type="border-card" style="margin:20px 10%;width: 80%;height: 470px;">
        <el-tab-pane label="Home">Home</el-tab-pane>
        <el-tab-pane label="Modify Password">Modify Password</el-tab-pane>
        <el-tab-pane label="Modify TEL">Modify TEL</el-tab-pane>
      </el-tabs>
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
import BackNav from "../../components/BackNav"
export default {
    components:{
        BackNav,
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

</style>