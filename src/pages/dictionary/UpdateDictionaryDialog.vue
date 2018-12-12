<template>
  <el-dialog title="修改" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :append-to-body="true" :close-on-press-escape="false">
    <el-form :model="formData" ref="formData" :rules="rules" status-icon>
      <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="formData.code" style="width:500px"  auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="显示文本" :label-width="formLabelWidth" prop="text">
        <el-input v-model="formData.text" style="width:500px" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="文本值" :label-width="formLabelWidth" prop="value">
        <el-input v-model="formData.value" style="width:500px" auto-complete="on"></el-input>
      </el-form-item>
      <el-input type="hidden" v-model="formData.id" auto-complete="on"></el-input>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateDictionary('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

  export default {
    name: "UpdateDictionaryDialog",
    data() {
      var checkrelus = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        formData: {
          id: "",
          code: "",
          text: "",
          value: "",
        },
        rules: {
          code: [
            {required: true, validator: checkrelus, trigger: 'blur'},
            {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          text: [
            {required: true, validator: checkrelus, trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          value: [
            {required: true, validator: checkrelus, trigger: 'blur'},
          ]
        },
        formLabelWidth: '100px'
      }
    },
    methods: {
      showDialog(val) {
        this.dialogFormVisible = val;
      },
      initData(row) {
        this.formData.id = row.id
        this.formData.code = row.code
        this.formData.text = row.text
        this.formData.value = row.value
        console.log(this.formData)
      },
      /*修改信息*/
      updateDictionary(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("111" + this.formData)
            this.$api.addOrUpdateDictionary(this.formData).then(result => {
              if (result.data.code == 1) {
                this.$message('请填写有效信息');
              } else {
                let {data} = result
                let flag = this.$config.executeResult(data)
                if (flag) {
                  this.$message.success('操作成功');
                  this.$refs["formData"].resetFields();
                  this.$emit('reloadData');
                  this.dialogFormVisible = false
                }
              }
            })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>
<style>

</style>
