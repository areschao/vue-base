<template>
  <div class="page-body">
    <div class="box">
      <el-button type="primary" plain icon="el-icon-plus" @click="addMenu()">添加</el-button>
      <el-table ref="singleTable" v-loading="loading" :data="tableData" stripe
                style="margin-top: 15px">
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="名称" prop="name" width="120" align="center"></el-table-column>
        <el-table-column label="类别" prop="type" width="120" align="center" :formatter="formatterColumn"></el-table-column>
        <el-table-column label="url" prop="indexUrl" width="150" align="center"></el-table-column>
        <el-table-column label="上级菜单" prop="parentName" width="120" align="center"></el-table-column>
        <el-table-column label="图标" prop="icon" align="center"></el-table-column>
        <el-table-column label="描述" prop="description" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" class="fa fa-edit" plain @click="updateMenu(scope.$index, scope.row)"></el-button>
            <el-button type="danger" class="fa fa-trash-o" plain @click="handleDel(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-menu-dialog @reloadData="loadData" ref="addMenuDialog" :rowLength="rowLength"></add-menu-dialog>
      <update-menu-dialog @reloadData="loadData" ref="updateMenuDialog"></update-menu-dialog>

    </div>
  </div>
</template>
<style>
  .inputSearch {
    float: right;
  }
  .bottom{
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .input {
    width: 180px;
    float: right;
  }
</style>
<script>
  import AddMenuDialog from './AddMenuDialog'
  import UpdateMenuDialog from './UpdateMenuDialog'
  export default {
    data() {
      return {
        selectRollInfo: '',
        tableData: [],
        rowLength: 0,
        loading: false,
        currentRow: null,
        user: {
          loginName: '',
          phone: '',
          name: '',
          createTime: ''
        },
      }
    },
    components: {
      AddMenuDialog,
      UpdateMenuDialog
    },
    methods: {
      loadData() {
        this.loading = true
        this.$api.getMenu().then(result => {
          let {data} = result
          this.tableData = data.returnData
          this.rowLength = this.tableData.length + 1;
          this.loading = false
        })
      },
      addMenu() {
        this.$refs['addMenuDialog'].showDialog(true);
      },
      updateMenu(index, row) {
        this.$refs.updateMenuDialog.initData(row);
        this.$refs.updateMenuDialog.showDialog(true);
      },
      /* 格式化数据*/
      formatterColumn(row, column) {
        switch (row.type) {
          case 1:
            return "菜单";
            break;
          case 2:
            return '操作';
            break;
          default:
            return '';
        }
      },
      //删除
      handleDel(rowData) {
        this.$confirm('此操作将永久删除菜单, 是否继续?', '提示', {type: 'warning'})
          .then(() => { // 向请求服务端删除
            this.$api.deleteMenu(rowData.id)
              .then((result) => {
                if (result.data.code == 0) {
                  this.$message({
                    type: 'danger',
                    message: `已删除`
                  });
                }
                this.loadData();
              }).catch((result) => {
              this.$message.error('删除失败!');
            });
          }).catch(() => {
          this.$message.info('已取消操作!');
        });
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
    },
    mounted: function () {
      this.loadData()
    }
  }
</script>
