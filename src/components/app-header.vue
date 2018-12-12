<template>
  <m-navbar :theme="theme.theme.headerTheme">
    <m-navbar-brand>
      <i class="side-switch"
         :class="{
        'el-icon-more': !mini,
        'el-icon-more-outline': mini
      }"
         @click="handleSwitchSide"
      ></i>
    </m-navbar-brand>
    <m-nav align="right">

      <m-nav-item padding="0 5px">
        <!-- 天气 -->
        <el-popover
          placement="top-start"
          title="今天又是新的一天！"
          width="200"
          trigger="hover"
        >
          <i class="fa fa-soundcloud fa-lg" slot="reference"></i>
          <slot name="reference">
            <div class="weather">
              <iframe width="200" scrolling="no" height="65" frameborder="0" allowtransparency="true"
                      src="http://i.tianqi.com/index.php?c=code&id=12&icon=1&num=1">
              </iframe>
            </div>
          </slot>
        </el-popover>
      </m-nav-item>

      <m-nav-item padding="0">
        <m-dropdown align="right" v-if="user" padding="0 10px">
          <a href="#" style="display: inline-block; padding: 0px; color: inherit">
            <img src="../assets/user2.jpg" alt="" style="border-radius: 3px;vertical-align: middle;">
            <span class="caret"></span>
          </a>
          <m-dropdown-panel>
            <div class="test-line"></div>
            <m-dropdown-item><span @click="logout">退出账号</span></m-dropdown-item>
          </m-dropdown-panel>
        </m-dropdown>
      </m-nav-item>
      <m-nav-item padding="0 5px">
      </m-nav-item>
      <m-nav-item padding="0 5px">
        <a href="#" @click.stop.prevent="userInfo">
          <i
            class="fa fa-id-card" title="个人信息"
          ></i>
        </a>
      </m-nav-item>
      <m-nav-item padding="0 5px">
        <a href="#" @click.stop.prevent="handleSwitchScreen">
          <i
            class="fa"
            :class="isFullScreen ? 'fa-compress' : 'fa-expand'" title="全屏"
          ></i>
        </a>
      </m-nav-item>

      <m-nav-item padding="0">
        <m-dropdown align="right" padding="0 10px">
          <a href="#" style="padding:0 0px; color: inherit">
            <i class="fa fa-gears" title="设置"></i>
          </a>
          <m-dropdown-panel style="width: 200px; min-height: 100px;">
            <el-form>
              <el-form-item label="侧边栏">
                <el-switch v-model="showAside" @change="handleSwitchHideSide"/>
              </el-form-item>
              <el-form-item label="主题">
                <el-select v-model="themeType" style="width: 100px">
                  <el-option
                    v-for="theme in themes"
                    :key="theme.label"
                    :label="theme.label"
                    :value="theme.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </m-dropdown-panel>
        </m-dropdown>
      </m-nav-item>
    </m-nav>
  </m-navbar>
</template>
<script type="text/javascript">
  import {exitFullscreen, requestFullScreen} from '@/utils'
  import themes from './theme'

  export default {
    name: 'app-header',
    data() {
      return {
        mini: false,
        isFullScreen: false,
        themes,
        themeType: '',
        showAside: true,
        headerHeight: 50,
        theme: {theme: {headerTheme: 'info'}},
        user: {
          username: "system"
        }
      }
    },
    computed: {},
    watch: {
      themeType(val) {
        this.theme = this.themes.find(e => e.name === val) || {}
        this.$emit('set-theme', this.theme)
        localStorage.setItem('theme', val)
      }
    },
    methods: {
      userInfo() {
        this.$emit("userInfo")
      },
      handleSwitchSide() {
        this.mini = !this.mini
        this.$emit('switch', this.mini)
      },
      handleSwitchScreen() {
        if (this.isFullScreen) {
          exitFullscreen()
          this.isFullScreen = false
        } else {
          requestFullScreen()
          this.isFullScreen = true
        }
      },
      handleSwitchHideSide() {
        this.$emit('hide-side')
      },
      logout() {
        sessionStorage.removeItem("currentUser")
        this.$router.push({name: 'login'})
      },
      staticIndex(){
        window.open("http://192.168.1.29")
      }
    },
    created() {
      this.user = this.$config.getSession("currentUser")
      let theme = localStorage.getItem('theme') || 'default'
      this.themeType = theme
    }
  }
</script>
<style type="text/css">
  .side-switch {
    display: inline-block;
    font-size: 32px;
    cursor: pointer;
    color: inherit;
    margin-top: 10px;
  }

  .side-switch:hover {
    color: #fff;
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
</style>
