<template>
  <!-- 配置菜单模态窗口 -->
  <el-dialog title="配置菜单" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-tree
      :data="MenuManagement"
      show-checkbox
      node-key="id"
      ref="tree"
      :default-expanded-keys="[1]"
      :default-checked-keys="checkId"
      :default-expand-all="defaultExpandAll"
      :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
                <i :class="node.icon"></i>{{ node.label }}
            </span>
        </span>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="updatePermissions">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "MenuDialog",
    data() {
      return {
        dialogFormVisible: false,
        MenuManagement: [],
        checkId: [],
        roleId: '',
        boxCheck: [],
        defaultProps: {
          children: 'subMenu',
          label: 'label',
          icon: 'icon'
        },
        defaultExpandAll:true,
        requestId:Number

      }
    },
    methods: {
      menu(val, id) {
        this.requestId = id
        this.checkId = []
        this.$api.getMenuVo().then(httpResult => {
          let {data} = httpResult
          this.MenuManagement = data.returnData
          this.$api.findMenuById(id).then(httpResult=>{
            let {data} = httpResult
            this.checkId = data.returnData
          })
          this.dialogFormVisible = val;
        })

      },
      updatePermissions() {
        var halfCheck = this.$refs.tree.getHalfCheckedKeys();
        this.boxCheck = this.$refs.tree.getCheckedKeys();
        if (this.boxCheck.length == 0) {
          this.$message.error("至少选择一个菜单")
        } else {
          var menuIdStrs = '';
          for (var i = 0; i < this.boxCheck.length; i++) {
            i == this.boxCheck.length - 1 ? menuIdStrs += this.boxCheck[i] : menuIdStrs += this.boxCheck[i] + ",";
          }
          for (var i = 0; i < halfCheck.length; i++) {
            menuIdStrs += "," + halfCheck[i]
          }
          var parags = {
            roleId: this.requestId,
            menuIdStr: menuIdStrs
          }
          console.log(menuIdStrs)
          this.$api.saveMenu(parags).then(httpResult => {
            if (httpResult.data.codeMsg == "成功") {
              this.$message.success("配置菜单成功")
              this.dialogFormVisible = false;
            } else {
              this.$message.error("配置菜单错误")
            }
          })
        }
      }
    }

  }
</script>

<style scoped>

</style>
