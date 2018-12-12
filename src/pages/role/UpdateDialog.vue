<template>
  <el-dialog
    title="修改角色"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false" :append-to-body="true">
    <el-form :label-position="labelPosition" label-width="80px" status-icon :model="formLabelAlign" ref="formLabelAlign"
             :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="detail">
        <el-input v-model="formLabelAlign.detail"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="updateRole('formLabelAlign')">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "UpdateDialog",
    data() {
      var checkrelus = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: false,
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          detail: '',
          id: ''
        },
        rules: {
          name: [
            {validator: checkrelus, trigger: 'blur'},
            {min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur'},
            {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号'}
          ]
        },
      }
    },
    methods: {
      updateDialog(val, rowData) {
        this.dialogVisible = val;
        this.formLabelAlign.name = rowData.name;
        this.formLabelAlign.detail = rowData.description;
        this.id = rowData.id;
      },
      updateRole(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
              var par = {
                id: this.id,
                name: this.formLabelAlign.name,
                description: this.formLabelAlign.detail
              }
              this.$api.addRole(par).then(httpResult => {
                if (httpResult.data.code == 1) {
                  this.$message('请填写有效信息');
                } else {
                  let flag = this.$config.executeResult(httpResult.data)
                  if (flag) {
                    this.$message.success("修改成功")
                    this.dialogVisible = false;
                    this.$emit('reloadData')
                  }
                }
              })
            }
          }
        )}
    }
  }
</script>

<style scoped>

</style>
