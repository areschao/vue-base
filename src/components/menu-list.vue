<template>
  <el-menu
    :mode="mode"
    :collapse="collapse"
    :backgroundColor="backgroundColor"
    :textColor="textColor"
    :activeTextColor="activeTextColor"
    :defaultActive="defaultActive"
    :defaultOpeneds="defaultOpeneds"
    :uniqueOpened="uniqueOpened"
    :menuTrigger="menuTrigger"
    :router="router"
    @open="open"
    @close="close"
    @select="select"
  >
<template v-for="item in menus">
  <template v-if="isArr(item)">
  <el-menu-item-group
    :title="typeof item[0] === 'string' ? item[0] : ''"
    >
    <el-menu-item
      v-for="(val, index) in item[1]"
      :key="val.id"
      :index="val.label + ','+val.path"
      :route="toRoute(val)"
      >
      <i v-if="val.icon" :class="val.icon"></i>
      <span slot="title">{{val.label}}</span>
    </el-menu-item>
  </el-menu-item-group>
  </template>
  <template v-else>
    <el-submenu
      v-if="item.subMenu.length !== 0"
      :key="item.id"
      :index="item.label + ','+item.path"
      >
      <template slot="title">
        <i v-if="item.icon" :class="item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <menu-list :menus="item.subMenu"></menu-list>
    </el-submenu>
    <el-menu-item
      v-else
      :key="item.id"
      :index="item.label + ','+item.path"
      :route="toRoute(item)"
      >
      <i v-if="item.icon" :class="item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
  </template>
</template>
  </el-menu>
</template>
<script type="text/javascript">
  import menuList from './chunk'
export default {
    data(){
      return{
        menus:[{
          icon: 'fa fa-circle-o',
          label: '首页',
          path:'/',
          subMenu:[]
        }]
      }
    },
  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    collapse: {
      type: Boolean,
      default: false
    },
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    defaultActive: String,
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    menuTrigger: String,
    router: Boolean
  },
  components : {
    menuList
  },
  methods: {
    isArr (v) {
      return Object.prototype.toString.call(v) === '[object Array]'
    },
    toRoute (item) {
      if (item.name) {
        return {name: item.name}
      } else if (item.path) {
        return {path: item.path}
      }
      return {}
    },
    open (index) {
      this.$emit('open', index)
    },
    close (index) {
      this.$emit('close', index)
    },
    select (index,path) {
      this.$emit('select', index)
      let arr = index.split(',')
      this.$emit('addTabs',arr)
    }
  },
  created(){
    let menusStr = sessionStorage.getItem("menus");
    JSON.parse(menusStr).forEach((menu,index)=>{
      this.menus.push(menu)
    }) ;
    console.log(this.menus)
  }
}
</script>
