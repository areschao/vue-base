<template>
  <el-dialog title="新增菜单" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form :model="form" ref="form" :rules="rules" status-icon>
      <el-form-item label="上级菜单" :label-width="formLabelWidth">
        <el-select clearable v-model="form.parentId" placeholder="请选择" @focus="loadData()">
          <el-option
            v-for="item in parentsMenuList"
            :key="item.name"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="序号" :label-width="formLabelWidth">
        <el-input-number v-model="form.seq" :min="1" :max="999" label="序号"></el-input-number>
      </el-form-item>
      <el-form-item label="图标" :label-width="formLabelWidth">
        <el-input v-model="form.icon" placeholder="自行查看Font Awesome（网址：http://fontawesome.dashgame.com)" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="url" :label-width="formLabelWidth" prop="indexUrl">
        <el-input v-model="form.indexUrl" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="type" :label-width="formLabelWidth" prop="type">
        <el-input v-model="form.type" placeholder="菜单类别：（1：菜单，2：操作）" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="description">
        <el-input type="textarea" v-model="form.description" auto-complete="on"></el-input>
      </el-form-item>
      <el-input type="hidden" v-model="form.id" auto-complete="on"></el-input>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateMenu('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<style>

</style>

<script>
  export default {
    name: 'UpdateMenuDialog',
    data() {
      var checkrelus = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        } else {
          callback();
        }
      };
      return {
        parentsMenuList: [],
        form: {
          parentId: '',
          id: null,
          name: '',
          parentName: '',
          icon: '',
          seq: 0,
          indexUrl: '',
          description: '',
          type:''
        },
        rules: {
          name: [
            {required: true, validator: checkrelus, trigger: 'blur'},
            {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'},
            {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号'}
          ],
          indexUrl: [
            {required: true, validator: checkrelus, trigger: 'blur'},
          ],
          description: [
            {required: true, validator: checkrelus, trigger: 'blur'},
          ]
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      loadData() {
        this.$api.getMenu().then(result => {
          this.parentsMenuList = result.data.returnData;
        })
      },
      initData(row) {
        this.form.parentId = row.parentId;
        this.form.id = row.id;
        this.form.description = row.description;
        this.form.icon = row.icon;
        this.form.indexUrl = row.indexUrl;
        this.form.name = row.name;
        this.form.seq = row.seq;
        this.form.parentName = row.parentName;
        this.form.type = row.type
      },
      showDialog(val) {
        this.dialogFormVisible = val;
      },
      updateMenu(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.addOrUpdateMenu(this.form).then(result => {
              this.$message('请填写有效信息');

              let {data} = result
              let flag = this.$config.executeResult(data)
              if (flag) {
                this.$message.success('操作成功')
                this.$refs['form'].resetFields();
                this.$emit('reloadData');
                this.dialogFormVisible = false
              }
            })
          } else {
            return false;
          }
        })
      },
      mounted: function () {
        this.loadData()
      }
    }
  }
</script>
