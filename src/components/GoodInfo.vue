<template>
<div class="GoodInfo">
	<el-steps :space="200" :active="active" process-status="finish" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="简介和图片"></el-step>
        <el-step title="价格和地址"></el-step>
        <el-step title="内容审核"></el-step>
    </el-steps>
    <el-card class="contentCard">
        <div v-if="active==0">
            <div>
                标题:
                <el-input v-model="titleInput" placeholder="为你的商品起一个响亮的标题" class="titleInput"/>
            </div>
            <div>
                商品类型:     
                <el-select v-model="goodType" placeholder="选择商品类型" size="large" class="typeSelect">
                    <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"/>
                </el-select>
            </div>
            <div>
                商品名称:
                <el-input v-model="nameInput" placeholder="你想出售的商品是什么" class="nameInput"/>
            </div>
            <div>
                关键词:     
                <el-input v-model="keywordsInput" placeholder="输入搜索关键词，用分号分隔" class="keywordsInput"/>
            </div>
            <div>
                校区:     
                <el-select v-model="campus" placeholder="选择发布校区" size="large" class="campusSelect">
                    <el-option v-for="item in campusOptions" :key="item" :label="item" :value="item"/>
                </el-select>
            </div>
        </div>
        <div v-if="active==1">
            <div>
                <div style="width:50px;">简介:</div>
                <el-input v-model="introductionInput" placeholder="快来简单介绍一下你的商品吧" type="textarea" autosize class="titleInput"/>
            </div>
            <div>
                <div style="width:50px;margin-top:20px">图片:</div>
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :on-preview="handlePictureCardPreview"
                    :file-list="picList"
                    :limit="7"
                >
                    <i class="el-icon-plus"></i>
                    <template #tip>
                        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                    </template>
                </el-upload>
                <el-dialog v-model="picPreview">
                    <img width="100%" :src="previewUrl" alt="" />
                </el-dialog>
            </div>
        </div>
        <div v-if="active==2">
        </div>
        <div v-if="active==3">
        </div>
        <div v-if="active==4">
        </div>
    </el-card>
    <div v-if="active < 4" class="controlButton">
        <el-button @click="preStep" type="primary">上一步</el-button>
        <el-button @click="nextStep" type="primary">{{buttonInfo}}</el-button>
    </div>
</div>
</template>

<style scoped>
.GoodInfo{
    width: 500px;
    min-height: 600px;
    margin: 0 auto;
    position: relative;
}
.contentCard{
    font-family: 'FZHeiBJW';
    margin-top: 20px;
    margin-bottom: 10px;
}
.titleInput{
    width: 300px;
    margin-left:10px;
    margin-top: 16px;
}
.nameInput{
    width: 200px;
    margin-left:10px;
    margin-top: 16px;
    margin-right:132px;
}
.typeSelect{
    width:150px;
    margin-left:10px;
    margin-right:182px;
    margin-top: 20px;
}
.keywordsInput{
    width:300px;
    margin-left:10px;
    margin-right:16px;
    margin-top: 20px;
}
.campusSelect{
    width:150px;
    margin-left:10px;
    margin-right:150px;
    margin-top: 20px;
}
</style>

<script>
import '@/assets/fonts/font.css'
import { ElMessage } from 'element-plus'

export default {
    components:{
        
    },
    data(){
        return{
            active: 1,
            titleInput: "",
            nameInput: "",
            keywordsInput: "",
            introductionInput: "",
            goodType: "",
            campus: "",
            typeOptions: [
                "图书音像",
                "电子产品",
                "美妆个护",
                "运动户外",
                "生活电器",
                "其他"
            ],
            campusOptions: [
                "四平路校区",
                "嘉定校区",
                "沪西校区",
                "沪北校区"
            ],
            previewUrl: '',
            picPreview: false,
            picList: [],
        }
    },
    methods:{
        preStep(){
            if(this.active > 0)
                --this.active;
        },
        nextStep(){
            switch(this.active)
            {
            case 0:
                if(this.titleInput=="")
                    ElMessage.error('标题不可为空!');
                else if(this.goodType=="")
                    ElMessage.error('商品类型不可为空!');
                else if(this.nameInput=="")
                    ElMessage.error('商品名称不可为空');
                else if(this.keywordsInput=="")
                    ElMessage.error('关键词不可为空!');
                else if(this.campus=="")
                    ElMessage.error('校区不可为空!');
                else
                    ++this.active;
                break;
            case 1:
                if(this.introductionInput == "")
                    ElMessage.error('商品简介不可为空!');
                else
                    ++this.active;
                break;
            case 2:
                ++this.active;
                break;
            case 3:
                this.$confirm('确认后将对商品进行审核，审核通过后完成上架了！','提示')
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '上架成功'
                    })
                    location.reload();
                })
                .catch(() => {});
            }
        },
        handlePictureCardPreview(file) {
            console.log(file.url)
            console.log(this.picList)
            this.previewUrl = file.url;
            this.picPreview = true;
      }
    },
    computed:{
        buttonInfo: function(){
            return this.active < 3 ? "下一步" : "发布";
        },
    },
}
</script>