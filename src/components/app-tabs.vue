<!--suppress ALL -->
<template>
  <div class="app-tabs">
    <el-tabs v-model="editableTabsValue2" type="card" closable @tab-click="toRouter" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        editableTabsValue2: '/',
        editableTabs: [],
        tabIndex: 2
      }
    },
    methods: {
      toRouter(tab) {
        if (tab.name) {
          this.$router.push({path: tab.name})
        }
        return {}
      },
      addTab(arr){
        let tabs = this.editableTabs;
        if (this.isOnTab(arr)) {
          this.editableTabsValue2 = arr[1]
        } else {
          tabs.push({
            title: arr[0],
            name: arr[1],
          });
          this.editableTabsValue2 = arr[1]
        }
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        this.$router.push({path: activeName})
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      },
      isOnTab(arr) {
        let tabs = this.editableTabs;
        var is = false
        tabs.forEach((tab, index) => {
          if (tab.name === arr[1]) {
            is = true
          }
        })
        return is
      },
      init(){
        let title = this.$route.name
        let path = this.$route.path
        this.addTab([title,path])
      }
    },mounted : function () {
      this.init()
    }
  }

</script>
<style>

</style>
