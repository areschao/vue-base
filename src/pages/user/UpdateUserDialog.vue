<template>
  <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="30%" :append-to-body="true">
    <el-form :model="formData" ref="formData" :rules="rules" status-icon>
      <el-form-item label="用户名" prop="loginName" :label-width="formLabelWidth">
        <el-input v-model="formData.loginName" placeholder="用于登陆的账号长度在6-20之间" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="formData.name" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="formData.phone" placeholder="请填写真实的手机号" auto-complete="on"></el-input>
      </el-form-item>
      <el-input type="hidden" v-model="formData.id" auto-complete="on"></el-input>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateUser('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "UpdateUserDialog",
    data() {
      var checkrelus = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        } else {
          callback();
        }
      };
      var phone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        }
        setTimeout(() => {
          if (!Number(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value.length != 11) {
              callback(new Error('请输入正确的手机号'));
            }
            else {
              callback();
            }
          }
        });
      };
      return {
        formData: {
          id: '',
          loginName: '',
          name: '',
          phone: ''
        },
        rules:{
          loginName:[
            {required: true,validator: checkrelus, trigger: 'blur'},
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          name:[
            {required: true,validator: checkrelus, trigger: 'blur'},
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          phone:[
            {required: true,validator: phone, trigger: 'blur'},
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号' },
            { pattern: /^[1][3456789][0-9]{9}$/, message: '请输入正确的手机号' }
          ]
        },
        dialogFormVisible: false,
        formLabelWidth: '80px'
      }
    },
    methods: {
      showDialog(val) {
        this.dialogFormVisible = val;
      },
      initData(row){
        this.formData.id = row.id
        this.formData.loginName = row.loginName
        this.formData.name = row.name
        this.formData.phone = row.phone
      },
      updateUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid){
            this.$api.addOrUpdateUser(this.formData).then(result => {
                let {data} = result
                let flag = this.$config.executeResult(data)
                if (flag) {
                  this.$message.success('修改成功')
                  this.$emit('reloadData')
                  this.dialogFormVisible = false
                }
            })
          } else {
            return false;
          }
        })

      },
    }

  }
</script>

<style scoped>

</style>
