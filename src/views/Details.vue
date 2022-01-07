<template>
<el-card class="details">
    <el-card class="sellerInfo" @click="jumpSeller">
        <el-avatar :src="avatarPic" :size="100"/>
            <div class="nickName">{{ nickName }}</div>
            <el-divider/>
            <el-form label-width="75px" class="infoForm">
                <el-form-item label="已售数目:">
                    {{buyerCommentList.length}}
                </el-form-item>
                <el-form-item label="买家评分:">
                    <el-rate v-model="buyerRate" disabled :show-score="buyerCommentList.length > 0" text-color="#ff9900" style="margin-top:10px"/>
                </el-form-item>
            </el-form>
    </el-card>
    <div class="goodInfo">
        <div class="goodTop">
            <div class="goodBaseInfo">
                <el-carousel height="240px">
                    <el-carousel-item v-for="(image,index) in images" :key="index">
                        <img :src="image">
                    </el-carousel-item>
                </el-carousel>
                {{goodName}}
            </div>
            <div class="goodDetails">
                <div class="title">
                    {{title}}
                </div>
                <el-divider/>
                <el-form>
                    <el-form-item label="价格:">
                        ￥{{price}}
                    </el-form-item>
                    <el-form-item label="地址:">
                        {{location=="" ? "未规定": location}}
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="goodMiddle">
            <div>详细信息</div>
            <el-divider/>
            <div class="goodDescription">
            {{goodDescription}}
            </div>
        </div>
        <div class="goodControl">
            <el-button :type="isFavorite" icon="el-icon-star-off" circle @click="favorite"></el-button>
            <el-button :type="isShoppingCart" icon="el-icon-shopping-cart-2" circle @click="shoppingCart"></el-button>
            <el-button type="primary" icon="el-icon-shopping-bag-1" circle @click="buy(id)"></el-button>
        </div>
    </div>
</el-card>
</template>

<style scoped>
.details{
    width: 1000px;
    margin: 5px auto;
}
.sellerInfo{
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    width: 30%;
    text-align: center;
    padding: 20px 0;
    height: 350px;
    float: left;
}
.nickName {
    margin: 15px 0 10px;
    font-size: 40px;
    font-weight: 800;
    color: #262626;
    font-family: '楷体';
}
.infoForm{
    padding:5px 20px;
    font-family: 'FZHeiBJW';
}
.goodInfo{
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 30px;
    width: 60%;
    text-align: center;
    padding: 0;
    height: 600px;
    float: left;
}
.goodBaseInfo{
    width:40%;
    float:left;
    padding: 0;
    font-family: 'FZHeiBJW';
}
.goodDetails{
    width:50%;
    float:left;
    margin-left: 10%;
    font-family: 'FZHeiBJW';
    padding: 5px 0;
}
.title{
    font-size: 27px;
    font-weight: 800;
    color: #262626;
    font-family: '楷体';
    padding: 0 20;
    height: 110px;
}
.goodTop{
    height:250px;
    padding: 20px 0;
    width:100%;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
.goodMiddle{
    margin-top: 10px;
    padding: 20px 0;
    width:100%;
    font-family: 'FZHeiBJW';
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
.goodDescription{
    font-size: 10px;
    min-height: 120px;
}
.goodControl{
    margin-top: 20px;
}
</style>

<script>
import '@/assets/fonts/font.css'

export default {
    components:{
        
    },
    data(){
        return{
            id: 0,
            avatarPic: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            nickName: "良心商家",
            buyerCommentList: [{
                rate:3.5,
            }],
            images: [require("../assets/physics.png"), require("../assets/ipad.png")],
            goodName: "一个普通的商品",
            title: "打折促销，先到先得，错过后悔一整年。",
            price: 500,
            location: "",
            goodDescription: "这里是商品说明",
            isFavorite:"primary",
            isShoppingCart: "primary",
        }
    },
    methods:{
        buy(itemID){
            this.$router.push({
                path:'/confirm',
                query:{
                    gid:itemID,
                }
            })
        },
        favorite(){
            if(this.isFavorite=="primary")
                this.isFavorite="danger";
            else
                this.isFavorite="primary";
        },
        shoppingCart(){
            if(this.isShoppingCart=="primary")
                this.isShoppingCart="danger";
            else
                this.isShoppingCart="primary";
        }
    },
    computed:{
        buyerRate: function(){
            var totalRate=0;
            this.buyerCommentList.forEach((comment)=>{
                totalRate += comment.rate;
            })
            return Number((totalRate / this.buyerCommentList.length).toFixed(1));
        },
    }
}
</script>