webpackJsonp([18],{"0wB8":function(e,i){},gPth:function(e,i,l){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={name:"UpdateDialog",data:function(){return{dialogVisible:!1,labelPosition:"right",formLabelAlign:{name:"",detail:"",id:""},rules:{name:[{validator:function(e,i,l){if(!i)return l(new Error("内容不能为空"));l()},trigger:"blur"},{min:1,max:6,message:"长度在 1 到 6 个字符",trigger:"blur"},{pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+$/,message:"不允许输入空格等特殊符号"}]}}},methods:{updateDialog:function(e,i){this.dialogVisible=e,this.formLabelAlign.name=i.name,this.formLabelAlign.detail=i.description,this.id=i.id},updateRole:function(e){var i=this;this.$refs[e].validate(function(e){if(e){var l={id:i.id,name:i.formLabelAlign.name,description:i.formLabelAlign.detail};i.$api.addRole(l).then(function(e){1==e.data.code?i.$message("请填写有效信息"):i.$config.executeResult(e.data)&&(i.$message.success("修改成功"),i.dialogVisible=!1,i.$emit("reloadData"))})}})}}},t={render:function(){var e=this,i=e.$createElement,l=e._self._c||i;return l("el-dialog",{attrs:{title:"修改角色",visible:e.dialogVisible,"close-on-click-modal":!1,"append-to-body":!0},on:{"update:visible":function(i){e.dialogVisible=i}}},[l("el-form",{ref:"formLabelAlign",attrs:{"label-position":e.labelPosition,"label-width":"80px","status-icon":"",model:e.formLabelAlign,rules:e.rules}},[l("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[l("el-input",{model:{value:e.formLabelAlign.name,callback:function(i){e.$set(e.formLabelAlign,"name",i)},expression:"formLabelAlign.name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"描述",prop:"detail"}},[l("el-input",{model:{value:e.formLabelAlign.detail,callback:function(i){e.$set(e.formLabelAlign,"detail",i)},expression:"formLabelAlign.detail"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{nativeOn:{click:function(i){e.dialogVisible=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(i){e.updateRole("formLabelAlign")}}},[e._v("提交")])],1)],1)},staticRenderFns:[]};var n=l("C7Lr")(a,t,!1,function(e){l("0wB8")},"data-v-126341f5",null);i.default=n.exports}});
//# sourceMappingURL=18.d028d75335b70f206f8f.js.map