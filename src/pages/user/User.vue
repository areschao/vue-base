<template>
  <div class="page-body">
    <div class="box">
      <el-button type="primary" plain icon="el-icon-plus" @click="addUser">添加</el-button>
      <el-table ref="singleTable" v-loading="loading" :data="tableData" stripe highlight-current-row
                @current-change="handleCurrentChange"
                style="margin-top: 15px">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="loginName" label="工号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <div slot-scope="scope">
            <el-button type="success" class="fa fa-edit" plain @click="updateUser(scope.$index, scope.row)"></el-button>
            <el-button type="danger" class="fa fa-trash-o" plain
                       @click="deleteUser(scope.$index, scope.row)"></el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- 表格底部 -->
      <add-user-dialog @reloadData="loadData" ref="addUserDialog"></add-user-dialog>
      <update-user-dialog @reloadData="loadData" ref="updateUserDialog"></update-user-dialog>
      <role-dialog @reloadData="loadData" ref="roleDialog"></role-dialog>
      <app-page :total="total" @reloadData="loadData" ref="appPage"></app-page>

      <div class="changeRole">
        <div class="">
          <el-button @click="changeRole" :disabled="!currentRow" icon="fa fa-user-o"> 分配角色</el-button>
          <el-button @click="resetPassword" :disabled="!currentRow" icon="fa fa-user-o"> 重置密码</el-button>
        </div>
      </div>
    </div>
  </div>

</template>
<style>


  .changeRole {
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 10px;
  }

</style>


<script>
  import AddUserDialog from './AddUserDialog'
  import UpdateUserDialog from './UpdateUserDialog'
  import RoleDialog from './RoleDialog'
  import AppTabs from '@/components/app-tabs'
  import AppPage from '@/components/app-page'

  export default {
    data() {
      return {
        tableData: [],
        total: 1,
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
      AddUserDialog,
      UpdateUserDialog,
      RoleDialog,
      AppTabs,
      AppPage
    },
    methods: {
      loadData(page = 1, rows = 10) {
        this.loading = true
        this.$api.getUser({page: page, rows: rows}).then(result => {
          let {data} = result
          this.tableData = data.returnData.records
          this.total = data.returnData.total
          this.loading = false
        })
      },
      addUser() {
        this.$refs.addUserDialog.showDialog(true)
      },
      updateUser(index, row) {
        this.$refs.updateUserDialog.initData(row)
        this.$refs.updateUserDialog.showDialog(true)
      },
      deleteUser(index, row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteUser(row.id).then(result => {
            let {data} = result
            let flag = this.$config.executeResult(data)
            if (flag) {
              this.$message.success('删除成功')
              this.loadData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      changeRole() {
        if (this.currentRow === null) {
          this.$message.warning("系统消息", "请至少选中一行")
        } else {
          this.$refs.roleDialog.showDialog(true)
          this.$refs.roleDialog.initData(this.currentRow.id)
        }
      },
      resetPassword() {
        this.$confirm('确定要重置密码么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.resetUserPassword(this.currentRow.id).then(result => {
            let {data} = result
            let flag = this.$config.executeResult(data)
            if (flag) {
              this.$message.success('重置成功')
              this.loadData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
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
