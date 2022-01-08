<template>
<div class="confirm">
    <div class="title">
        确认订单
    </div>
	<el-card class="card">
        <el-form label-width="90px">
            <el-form-item label="商品价格:">
                ￥500
            </el-form-item>
            <el-form-item label="交易地址:">
                <div v-if="sellerLocation.length">{{sellerLocation}}</div>
                <el-input v-else v-model="location"></el-input>
            </el-form-item>
            <el-form-item label="地址说明:">
                <div v-if="sellerLocationDescription.length">{{sellerLocationDescription}}</div>
                <el-input v-else v-model="locationDescription" autosize type="textarea"></el-input>
            </el-form-item>
            <el-form-item v-if="sellerTimeDescription.length" label="时间限制:">
                <el-input v-model="locationDescription" autosize type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="交易日期:">
                <el-date-picker v-model="date" type="date" placeholder="选择交易日期"/>
            </el-form-item>
            <el-form-item label="交易时间:">
                <el-time-picker v-model="time" format="HH:mm" placeholder="选择交易时间"/>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="cancel">取消</el-button>
                <el-button type="primary" @click="pay">支付</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<style scoped>
.confirm{
    width: 400px;
    margin: 5px auto;
}
.title{
    margin: 15px 0 10px;
    font-size: 40px;
    font-weight: 800;
    color: #262626;
    font-family: '楷体';
}
.card{
    padding: 0 20px;
}
</style>

<script>
export default {
    components:{
        
    },
    data(){
        return{
            sellerLocation: '',
            sellerLocationDescription: '',
            sellerTimeDescription: '',
            location: '',
            locationDescription: '',
            date: '',
            time: '',
            id: 0,
        }
    },
    methods:{
        cancel(){
            this.$router.push({
                path:'/details',
                query:{
                    gid:this.id,
                }
            })
        },
        pay(){
            this.$confirm('确认下单吗？','提示')
                .then(() => {
                    this.$router.push({
                        path:'/home'
                    })
                })
                .catch(() => {});
        }
    }
}
</script>