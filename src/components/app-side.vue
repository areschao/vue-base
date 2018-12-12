<template>

<menu-list class="side-menu"
  :collapse="collapse"
  :default-active="defaultActive"
  router
  :background-color="theme.backgroundColor"
  :text-color="theme.textColor"
  :active-text-color="theme.activeTextColor"
           @addTabs="addTabs"
  ></menu-list>
</template>
<script type="text/javascript">
import menuList from './menu-list'
export default {
  props: {
    collapse: Boolean,
    theme: Object
  },
  components: {
    menuList
  },
  data () {
    return {
      defaultActive: '首页,/',
    }
  },
  watch: {
    $route () {
      this.setCurrentRoute()
    }
  },
  methods: {
    setCurrentRoute () {
      this.defaultActive = this.$route.name+','+this.$route.path  //获取当前页面的路由
    },
    addTabs(arr){
      this.$emit('toAddTab',arr)
    }
  },
  created () {
    this.setCurrentRoute()
  }
}
</script>
<style type="text/css">
  .el-menu.side-menu{
    border-right: none;
  }
  .el-menu .fa{
    font-size: 18px;
    margin-right: 7px;
    display: inline-block;
    width: 23px;
    text-align: center;
  }
  .el-menu.side-menu .el-menu-item.is-active {
    color: #409EFF;
    border-right: solid 2px #36c1fa;
    background: #eef3f5;
  }
</style>
