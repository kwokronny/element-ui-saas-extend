(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{490:function(e,n,i){"use strict";i.r(n);i(24),i(97),i(52);var a=[{id:1,name:"赵一",phone:"1311111111",email:"zhaoyi@baijiaxin.cn"},{id:2,name:"钱二",phone:"1311111112",email:"qianer@baijiaxin.cn"},{id:3,name:"孙三",phone:"1311111113",email:"sunsan@baijiaxin.cn"},{id:4,name:"李四",phone:"1311111114",email:"lisi@baijiaxin.cn"},{id:5,name:"周五",phone:"1311111115",email:"zhouwu@baijiaxin.cn"},{id:6,name:"吴六",phone:"1311111116",email:"wuliu@baijiaxin.cn"},{id:7,name:"郑七",phone:"1311111117",email:"zhengqi@baijiaxin.cn"},{id:8,name:"王八",phone:"1311111118",email:"wangba@baijiaxin.cn"},{id:9,name:"冯九",phone:"1311111119",email:"fengjiu@baijiaxin.cn"}],t={name:"UserSelector",data:function(){return{phone:"",name:"",email:"",list:[]}},methods:{queryUser:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"name",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.list=a.filter((function(i){return i[e]&&i[e].indexOf(n)>-1}))},selectItem:function(e){var n=a.find((function(n){return n.id==e}));n&&(this.phone=n.phone,this.name=n.name,this.email=n.email,this.$emit("select",n))}},mounted:function(){this.queryUser()}},l=i(9),o=Object(l.a)(t,(function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("el-row",[i("el-col",{attrs:{span:8}},[i("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",filterable:"","filter-method":function(n){return e.queryUser("name",n)},placeholder:"姓名"},on:{change:e.selectItem},model:{value:e.name,callback:function(n){e.name=n},expression:"name"}},e._l(e.list,(function(n,a){return i("el-option",{key:"userSelectorName"+n.id+a,attrs:{value:n.id}},[e._v(e._s(n.name)+"/"+e._s(n.phone)+"/"+e._s(n.email))])})),1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",filterable:"","filter-method":function(n){return e.queryUser("phone",n)},placeholder:"手机号"},on:{change:e.selectItem},model:{value:e.phone,callback:function(n){e.phone=n},expression:"phone"}},e._l(e.list,(function(n,a){return i("el-option",{key:"userSelectorPhone"+n.id+a,attrs:{value:n.id}},[e._v(e._s(n.name)+"/"+e._s(n.phone)+"/"+e._s(n.email))])})),1)],1),e._v(" "),i("el-col",{attrs:{span:8}},[i("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",filterable:"","filter-method":function(n){return e.queryUser("email",n)},placeholder:"邮箱"},on:{change:e.selectItem},model:{value:e.email,callback:function(n){e.email=n},expression:"email"}},e._l(e.list,(function(n,a){return i("el-option",{key:"userSelectorEmail"+n.id+a,attrs:{value:n.id}},[e._v(e._s(n.name)+"/"+e._s(n.phone)+"/"+e._s(n.email))])})),1)],1)],1)}),[],!1,null,null,null);n.default=o.exports}}]);