<template>
<el-scrollbar height="673px">
		<el-container style="height: 700px">
			<el-header style="background-color: #2c3e50; color: white">
				<back-nav />
			</el-header>
			<el-container style="height: 100%">
				<el-aside width="200px" style="background-color: #545c64;height: 100%;">
					<SideNav />
				</el-aside>
				<el-main>
                <!--此处写代码-->

				</el-main>	
			</el-container>
		</el-container>
	</el-scrollbar>
</template>

<script>
import SideNav from '../../components/SideNav'
import BackNav from '../../components/BackNav'
export default {

    components:{
        SideNav,
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