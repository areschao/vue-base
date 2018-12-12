<template>
  <el-container class="app-container"
                :class="{
    'mini-side': isCollapse,
    'hide-side': hideSide
  }"
  >
    <el-aside class="app-side" :width="hideSide ? '0' : sideWidth + 'px'"
              :style="{background: theme.theme.backgroundColor}"
    >
      <app-side :collapse="isCollapse" :theme="theme.theme" @toAddTab="toAddTab"></app-side>
    </el-aside>
    <el-container style="overflow-x: auto">
      <el-header class="app-header" :height="headerHeight + 'px'">
        <app-header @switch="handleSideSwitch" @set-theme="handleSetTheme"
                    @hide-side="handleSwitchHideSide"  @userInfo="userInfo"  ></app-header>
        <app-tabs ref="apptabs" class="app-tabs"></app-tabs>
      </el-header>
      <el-main class="app-body">
        <AppUpdatePw v-show="isShow"  @cancel="cancel"></AppUpdatePw>
        <AppUserInfo v-show="infoShow" ref="userInfo" @updatePW="updatePW" @cancel="cancel"></AppUserInfo>
        <el-main class="app-page-body ">
          <router-view class="animated fadeIn"></router-view>
        </el-main>
      </el-main>
      <el-footer class="app-footer" :height="footerHeight + 'px'">
        <app-footer></app-footer>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script type="text/javascript">
  import AppHeader from '@/components/app-header'
  import AppFooter from '@/components/app-footer'
  import AppSide from '@/components/app-side'
  import AppTabs from '@/components/app-tabs'
  import AppUserInfo from '@/components/app-userInfo'
  import AppUpdatePw from '@/components/app-updatePw'

  export default {
    name: 'app-view',
    data() {
      return {
        isShow:false,
        infoShow:false,
        isCollapse: false,
        hideSide: false,
        sideWidth: 180,
        footerHeight: 50,
        headerHeight: 90,
        theme: {theme: {}}
      }
    },
    components: {
      AppHeader,
      AppFooter,
      AppSide,
      AppTabs,
      AppUserInfo,
      AppUpdatePw
    },
    methods: {
      updatePW(){
        this.isShow = !this.isShow
        this.infoShow=false;
      },
      userInfo(){
        console.log("123");
        this.$refs.userInfo.loadUserInfo();
        this.isShow=false;
        this.infoShow=!this.infoShow;
      },
      cancel(){
        this.isShow=false;
        this.infoShow=false;
      },
      handleSideSwitch(val) {
        this.isCollapse = val
        this.sideWidth = val ? 60 : 180
      },
      handleSwitchHideSide() {
        this.hideSide = !this.hideSide
      },
      handleSetTheme(theme) {
        this.theme = theme
      },
      toAddTab(arr) {
        this.$refs.apptabs.addTab(arr)
      }
    }
  }
</script>
<style type="text/css">
  .app-tabs {
    height: 40px;
    background-color: #fff;
    box-shadow: 10px 1px 15px rgba(0,0,0,0.17)
  }
  .app-container {
    margin: 0 auto;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .app-container .app-header {
    padding: 0;
    background: #16AAD8;
    overflow: visible;
    z-index: 100;
  }

  .app-container .app-side {
    width: 180px;
    transition: all 0.5s ease;
  }

  .app-container .app-body {
    background: #EDF1F5;
    padding: 0;
  }

  .app-container .app-footer {
    background: #fff;
    border-top: solid 1px rgba(48, 54, 62, 0.14);
  }

  .app-container .app-page-body {
    overflow: visible;
    padding: 0px;
    height: 100%;
  }

  .app-header-logo-box {
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .app-header-logo-box .header-logo {
    height: 42px;
    margin-top: -17px;
    margin-right: 5px;
    vertical-align: middle;
  }

  .app-header-logo-box .header-logo-text {
    font-size: 20px;
    font-weight: bold;
    opacity: 1;
  }

  /*mini-side*/
  .app-container.mini-side .app-side {
    overflow: visible;
  }

  .app-container.mini-side .app-side .el-menu--collapse {
    width: 60px;
  }

  .app-container.mini-side .header-logo {
    margin-left: -10px;
  }

  .app-container.mini-side .header-logo-text {
    opacity: 0;
  }

  /*hide-side*/
  .app-container.hide-side .app-side {
    display: none;
  }
</style>
