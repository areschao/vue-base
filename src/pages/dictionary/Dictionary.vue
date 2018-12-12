<template>
  <div class="page-body">
    <div class="box">
      <el-button type="primary" plain icon="el-icon-plus" @click="addDictionary()">添加</el-button>
      <el-form :inline="true" :model="dictionary" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="dictionary.code" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click=" loadData()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="singleTable" :data="tableData" v-loading="loading"
                highlight-current-row @current-change="handleCurrentChange">
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="编码" prop="code" align="center"></el-table-column>
        <el-table-column label="文本" prop="text" align="center"></el-table-column>
        <el-table-column label="文本值" prop="value" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
        <el-table-column label="是否默认" prop="isDefault" style="color: #bb0000" :formatter="formatterColumn"
                         align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <div slot-scope="scope">
            <el-button type="success" class="fa fa-edit" plain @click="updateDictionary(scope.row)"></el-button>
            <el-button type="danger" class="fa fa-trash-o" plain @click="deleteDictionary(scope.row)"></el-button>
          </div>
        </el-table-column>
      </el-table>

      <add-dictionary-dialog @reloadData="loadData" ref="addDictionaryDialog"></add-dictionary-dialog>
      <update-dictionary-dialog @reloadData="loadData" ref="updateDictionaryDialog"></update-dictionary-dialog>
      <app-page :total="total" @reloadData="loadData" ref="appPage"></app-page>

      <div class="bottomButton">
        <div>
          <el-button @click="isDefault()" plain icon="el-icon-star-on">设置默认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AddDictionaryDialog from './AddDictionaryDialog'
  import UpdateDictionaryDialog from './UpdateDictionaryDialog'
  import AppPage from '@/components/app-page'

  export default {
    data() {
      return {
        tableData: [],
        loading: false,
        dialogFormVisible: false,
        dictionary: {
          code: "",
          text: "",
          value: "",
          createTime: "",
        },
        formLabelWidth: '70px',
        total: 0,
      }
    },
    components: {
      AddDictionaryDialog,
      UpdateDictionaryDialog,
      AppPage
    },
    methods: {
      /*添加*/
      addDictionary() {
        this.$refs.addDictionaryDialog.showDialog(true)
      },
      /*修改*/
      updateDictionary(row) {
        this.$refs.updateDictionaryDialog.initData(row)
        this.$refs.updateDictionaryDialog.showDialog(true)
      },
      /* 加载数据*/
      loadData(page = 1 ,rows = 10) {
        this.loading = true
        this.$api.getDictionaryByPage({
          page: page,
          rows: rows,
          code: this.dictionary.code
        }).then(result => {
          let {data} = result
          this.tableData = data.rows
          this.total = data.total
          this.loading = false
        }).catch((result) => {
          this.$message.error('获取失败!');
        });
      },

      /* 格式化数据*/
      formatterColumn(row, column) {
        switch (row.isDefault) {
          case 0:
            return "默认选中";
            break;
          case 1:
            return '';
            break;
          default:
            return '';
        }
      },
      /*删除一条记录*/
      deleteDictionary(rowData) {
        this.$confirm('此操作将永久, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'})
          .then(() => { // 向请求服务端删除
            this.$api.deleteDictionary(rowData).then((result) => {
              let {data} = result
              let flag = this.$config.executeResult(data)
              if (flag) {
                this.$config.successMessage("字典值", "删除成功")
                this.loadData();
              }
            }).catch(() => {
              this.$message.info('已取消操作!');
            });
          });
      },
      /*设置默认*/
      isDefault() {
        if (this.currentRow == null) {
          this.$config.warningMessage("请选中一行信息")
        } else {
          this.$api.isDefaultDictionary(this.currentRow.id, this.currentRow.code).then(result => {
            let {data} = result
            let flag = this.$config.executeResult(data)
            if (flag) {
              this.$message.success(data.operationContentDetails)
              this.loadData()
            }
          })
        }
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    },
    mounted: function () {
      this.loadData()
    },
  }

</script>
<style>
  .demo-form-inline {
    float: right;
    height: 45px;
  }

  .bottomButton {
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
</style>
