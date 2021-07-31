<template>
	<el-row>
		<el-col :span="8">
			<el-select
				size="small"
				filterable
				:filter-method="(q)=>queryUser('name',q)"
				v-model="name"
				placeholder="姓名"
				@change="selectItem"
				style="width:100%"
			>
				<el-option
					v-for="(item,key) in list"
					:key="`userSelectorName${item.id}${key}`"
					:value="item.id"
				>{{item.name}}/{{item.phone}}/{{item.email}}</el-option>
			</el-select>
		</el-col>
		<el-col :span="8">
			<el-select
				size="small"
				filterable
				:filter-method="(q)=>queryUser('phone',q)"
				v-model="phone"
				placeholder="手机号"
				@change="selectItem"
				style="width:100%"
			>
				<el-option
					v-for="(item,key) in list"
					:key="`userSelectorPhone${item.id}${key}`"
					:value="item.id"
				>{{item.name}}/{{item.phone}}/{{item.email}}</el-option>
			</el-select>
		</el-col>
		<el-col :span="8">
			<el-select
				size="small"
				filterable
				:filter-method="(q)=>queryUser('email',q)"
				v-model="email"
				placeholder="邮箱"
				@change="selectItem"
				style="width:100%"
			>
				<el-option
					v-for="(item,key) in list"
					:key="`userSelectorEmail${item.id}${key}`"
					:value="item.id"
				>{{item.name}}/{{item.phone}}/{{item.email}}</el-option>
			</el-select>
		</el-col>
	</el-row>
</template>
<script>
const users = [
	{ id: 1, name: "赵一", phone:"1311111111", email:"zhaoyi@baijiaxin.cn"},
	{ id: 2, name: "钱二", phone:"1311111112", email:"qianer@baijiaxin.cn"},
	{ id: 3, name: "孙三", phone:"1311111113", email:"sunsan@baijiaxin.cn"},
	{ id: 4, name: "李四", phone:"1311111114", email:"lisi@baijiaxin.cn"},
	{ id: 5, name: "周五", phone:"1311111115", email:"zhouwu@baijiaxin.cn"},
	{ id: 6, name: "吴六", phone:"1311111116", email:"wuliu@baijiaxin.cn"},
	{ id: 7, name: "郑七", phone:"1311111117", email:"zhengqi@baijiaxin.cn"},
	{ id: 8, name: "王八", phone:"1311111118", email:"wangba@baijiaxin.cn"},
	{ id: 9, name: "冯九", phone:"1311111119", email:"fengjiu@baijiaxin.cn"}
]
export default {
	name: "user-selector",
	data() {
		return {
			phone: "",
			name: "",
			email: "",
			list: []
		};
	},
	methods:{
		queryUser(field="name", query = ""){
			this.list = users.filter((user=>user[field] && user[field].indexOf(query)>-1))
		},
		selectItem(id){
			let user = users.find(u=>u.id==id)
			if(user){
				this.phone = user.phone
				this.name = user.name
				this.email = user.email
				this.$emit("select",user);
			}
		}
	},
	mounted(){
		this.queryUser();
	}
};
</script>