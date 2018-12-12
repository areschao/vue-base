webpackJsonp([15],{"1WM+":function(e,t){},nuks:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"AddUserDialog",data:function(){var e=function(e,t,a){if(!t)return a(new Error("内容不能为空"));a()};return{formData:{id:"",loginName:"",name:"",phone:""},rules:{loginName:[{required:!0,validator:e,trigger:"blur"},{min:6,max:20,message:"长度在 6 到 20 个字符",trigger:"blur"}],name:[{required:!0,validator:e,trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],phone:[{required:!0,validator:function(e,t,a){if(!t)return a(new Error("内容不能为空"));setTimeout(function(){Number(t)?11!=t.length?a(new Error("请输入正确的手机号")):a():a(new Error("请输入数字值"))})},trigger:"blur"},{pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+$/,message:"不允许输入空格等特殊符号"},{pattern:/^[1][3456789][0-9]{9}$/,message:"请输入正确的手机号"}]},dialogFormVisible:!1,formLabelWidth:"120px"}},methods:{showDialog:function(e){this.dialogFormVisible=e},addUser:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.$api.addOrUpdateUser(t.formData).then(function(e){var a=e.data;t.$config.executeResult(a)&&(t.$message.success("操作成功"),t.$refs.formData.resetFields(),t.$emit("reloadData"),t.dialogFormVisible=!1)})})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"新增",visible:e.dialogFormVisible,width:"30%","append-to-body":!0},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"formData",attrs:{model:e.formData,rules:e.rules,"status-icon":""}},[a("el-form-item",{attrs:{label:"用户名",prop:"loginName","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"用于登陆的账号长度在6-20之间","auto-complete":"on"},model:{value:e.formData.loginName,callback:function(t){e.$set(e.formData,"loginName",t)},expression:"formData.loginName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"name","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"on"},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号",prop:"phone","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"请填写真实的手机号","auto-complete":"on"},model:{value:e.formData.phone,callback:function(t){e.$set(e.formData,"phone",t)},expression:"formData.phone"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addUser("formData")}}},[e._v("确 定")])],1)],1)},staticRenderFns:[]};var i=a("C7Lr")(r,o,!1,function(e){a("1WM+")},"data-v-381ff1d6",null);t.default=i.exports}});
//# sourceMappingURL=15.66f89612a93d4391a7e8.js.map