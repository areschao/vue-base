<template>
  <div class="page-body">
    <div class="box">
      <el-button type="primary" plain icon="el-icon-plus" @click="addRole">添加</el-button>
      <el-table :data="roleLists" highlight-current-row
                @current-change="handleCurrentChange" style="margin-top: 15px">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" class="fa fa-bars" plain @click="openMenu(scope.$index, scope.row)"></el-button>
            <el-button type="success" class="fa fa-edit" plain @click="updateRole(scope.$index, scope.row)"></el-button>
            <el-button type="danger" class="fa fa-trash-o" plain
                       @click="deleteRole(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--模态窗口-->
    <menu-dialog ref="MenuDialog"></menu-dialog>
    <add-dialog ref="AddDialog" @reloadData="loadData"></add-dialog>
    <update-dialog ref="UpdateDialog" @reloadData="loadData"></update-dialog>
  </div>
</template>

<script>

  import MenuDialog from './MenuDialog'
  import AddDialog from './AddDialog'
  import UpdateDialog from './UpdateDialog'

  export default {

    data() {
      return {
        addLoading: false,
        roleLists: [],
        currentRow: null,
        val: 10
      }
    },
    components: {
      MenuDialog,
      AddDialog,
      UpdateDialog
    },
    methods: {
      loadData() {
        this.$api.getRole().then(httpResult => {
          let {data} = httpResult
          this.roleLists = data.returnData
          this.loading = false
          return httpResult;
        })
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      addRole: function () {
        this.$refs.AddDialog.showDialog(true)
      },
      updateRole: function (val,row) {
          this.$refs.UpdateDialog.updateDialog(true, row)
      },
      openMenu: function (val,row) {
          this.$refs.MenuDialog.menu(true, row.id)
      },
      deleteRole(index, row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((error) => {
          this.$api.deleteRole(row.id).then(result => {
            let flag = this.$config.executeResult(result.data)
            if (flag) {
              this.$message.success("删除成功")
              this.loadData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
      }
    },
    mounted() {
      this.loadData()
    }
  }
</script>

<style>
  .box-body {
    width: 100%;
    overflow: auto;
  }
</style>
