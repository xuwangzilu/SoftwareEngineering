<template>
<div style="background-color: #0099CC; height: 60px">
  <el-row>
    <el-col :span="3">
      <h1 style="margin-top: 10px;color: #ffffff;">{{ title }}</h1>
    </el-col>
    <el-col :span="3" :offset="18">
      <el-button type="primary" plain style="margin-top: 10px" @click="$router.push('/home')">首页</el-button>
      <el-button type="danger" style="margin-top: 10px" @click="logOut">注销</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  created() {
    this.getTitle()
  },
  methods: {
    logOut() {
      window.sessionStorage.setItem('uid', '0')
      this.$router.push('/home')
      this.$router.go(0);
    },
    getTitle() {
      let character = this.$route.path
      if(character.substring(1,6) === 'admin')
        this.title = '管理员后台'
      else {
          this.title = '用户中心'
      }
    },
  },
}
</script>

<style scoped>

</style>