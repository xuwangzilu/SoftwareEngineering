<template>
<div class="handleReports">
    <el-card>
        <div class="title">
            剩余{{num}}条
        </div>
        <el-divider/>
        <el-form label-width="120px">
            <el-form-item label="举报用户:">
                {{reporter}}
            </el-form-item>
            <el-form-item label="被举报用户:">
                {{reported}}
            </el-form-item>
            <el-form-item label="举报原因:">
                {{reason}}
            </el-form-item>
            <el-form-item label="处理结果:">
                <el-input v-model="result" type="textarea" autosize class="timeDescriptionInput"/>
            </el-form-item>
            <el-form-item>
                <el-button type="info" @click="blockUser">封禁用户</el-button>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<style scoped>
.title{
    font-size: 27px;
    font-weight: 800;
    color: #262626;
    font-family: '楷体';
    padding: 0 20;
}
.handleReports{
    margin: 20px auto;
    width: 400px;
}
</style>

<script>

export default {
    components:{
        
    },
    data(){
        return{
            num: 5,
            reporter: 12345678,
            reported: 2345678,
            reason: "啊吧啊吧",
            result: "",
        }
    },
    methods:{
        blockUser(){
            this.$confirm('确认要封禁改用户吗？','提示')
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '封禁成功'
                    })
                })
                .catch(() => {});
        },
        submit(){
            this.$confirm('确认提交审理结果吗？','提示')
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '审理成功'
                    })
                    if(this.num > 1){
                        --this.num;
                    }
                })
                .catch(() => {});
        }
    },
}
</script>