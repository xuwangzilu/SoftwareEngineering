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
      <el-container style="height: 40px;margin:30px 33% 0 33%;">
        <el-row>
        <el-input v-model.trim="keyWord" placeholder="Type to Search." style="width: 500px;" @keyup.enter="searchKeyWord()">
          <template #prefix>
            <i class="el-icon-search" style="width:20px;"></i>
          </template>
          <template #suffix>
            <el-button plain type="primary" size="small" round @click="searchKeyWord()">搜索</el-button>
          </template>        
        </el-input>
        </el-row>
      </el-container>
      <el-container style="height: 30px;margin: 0px 33%;">
        <el-row>
          <el-button type="text" size="mini" style="padding: 0;margin-left: 14px;" @click="jumpKeyWord('高数第七版')">高数第七版</el-button>
          <el-button type="text" size="mini" style="padding: 0;" @click="jumpKeyWord('大红袍茶叶')">大红袍茶叶</el-button>
          <el-button type="text" size="mini" style="padding: 0;" @click="jumpKeyWord('收音机')">四六级收音机</el-button>
          <el-button type="text" size="mini" style="padding: 0;" @click="jumpKeyWord('羽毛球拍')">羽毛球拍</el-button>
          <el-button type="text" size="mini" style="padding: 0;" @click="jumpKeyWord('空气净化器')">空气净化器</el-button>
          <el-button type="text" size="mini" style="padding: 0;" @click="jumpKeyWord('雷蛇鼠标')">雷蛇鼠标</el-button>
          <el-button type="text" size="mini" style="padding: 0;" @click="jumpKeyWord('机械键盘')">机械键盘</el-button>
        </el-row>
      </el-container>
      <div style="margin: 10px 0 0 0;"></div>
      <el-container style="height: 280px;margin:0 12%;">
      <el-row>
        <el-menu class="el-menu-vertical" style="width: 133px;margin-right:4px;">
          <el-menu-item index="1" @click="jumpMenu('图书音像')">
            <i class="el-icon-reading" style="width:20px;"></i>
            <span>图书音像</span>
          </el-menu-item>
          <el-menu-item index="2" @click="jumpMenu('电子产品')">
            <i class="el-icon-monitor" style="width:20px;"></i>
            <span>电子产品</span>
          </el-menu-item>
          <el-menu-item index="3" @click="jumpMenu('美妆个护')">
            <i class="el-icon-magic-stick" style="width:20px;"></i>
            <span>美妆个护</span>
          </el-menu-item>
          <el-menu-item index="4" @click="jumpMenu('运动户外')">
            <i class="el-icon-bicycle" style="width:20px;"></i>
            <span>运动户外</span>
          </el-menu-item>            
          <el-menu-item index="5" @click="jumpMenu('生活电器')">
            <i class="el-icon-odometer" style="width:20px;"></i>
            <span>生活电器</span>
          </el-menu-item>           
        </el-menu>
        <el-carousel height="280px" style="width: 836.05px;">
          <el-carousel-item v-for="item in imageList" :key="item.no">
            <el-image :src="item.path" fit="scale-down" />
          </el-carousel-item>
        </el-carousel>
        <el-menu class="el-menu-vertical" style="width: 133px;margin-left: 4px;">
          <el-menu-item index="1">
            <i class="el-icon-position" style="width: 20px;"></i>
            <span>校区分布</span>
          </el-menu-item>
          <el-menu-item index="2" @click="jumpMenu('四平路校区')">
            <i class="el-icon-food" style="width:20px;"></i>
            <span>四平路校区</span>
          </el-menu-item>
          <el-menu-item index="3" @click="jumpMenu('嘉定校区')">
            <i class="el-icon-office-building" style="width:20px;"></i>
            <span>嘉定校区</span>
          </el-menu-item>
          <el-menu-item index="4" @click="jumpMenu('沪西校区')">
            <i class="el-icon-first-aid-kit" style="width:20px;"></i>
            <span>沪西校区</span>
          </el-menu-item>            
          <el-menu-item index="5" @click="jumpMenu('沪北校区')">
            <i class="el-icon-suitcase" style="width:20px;"></i>
            <span>沪北校区</span>
          </el-menu-item>           
        </el-menu>   
      </el-row>       
      </el-container>
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
    created(){
      this.imageList=[
          { no:'1',path: require("../assets/1.jpg")},
          { no:'2',path: require("../assets/2.png")},
          { no:'3',path: require("../assets/3.jpg")},
          { no:'4',path: require("../assets/4.png")},
      ];
    },
    data(){
        return{
          keyWord:'', //搜索关键字
          imagelist: [  //走马灯图片
          ],
        }
    },
    methods:{
      //根据关键字搜索商品
      searchKeyWord(){

      },
      //点击关键字搜索商品
      jumpKeyWord(givenWord){
        this.$router.push({
          path:'/result',
          query:{
            name:givenWord,
          },
        });
      },
      //根据目录跳转分区
      jumpMenu(item){
        let tail=item.substr(-2,2);
        if(tail==='校区'){
          //将分类作为query参数传递至result页面
          this.$router.push({
            path:'./result',
            query:{
              region:item,
            }
          });
        }else if(tail==='分布'){
          return
        }else{
          this.$router.push({
            path:'./result',
            query:{
              catalog:item,
            }
          });
        }
      },
    },
}
</script>

<style scoped>

</style>