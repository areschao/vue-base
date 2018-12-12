<template>
  <div class="updatePassword animated slideInRight">
    <div class="gerenxinxi juzhong">个人信息</div>
    <div class="juzhong xingming">姓名：{{name}}</div>
    <div class="juzhong juese">角色：{{role}}</div>
    <el-button type="primary" round style="margin:5px 9px;width: 110px" @click="updatePW">修改密码</el-button>
    <el-button type="info" round style="width: 100px" @click="cancel">取消</el-button>
  </div>
</template>

<script>
  export default {
    name: "personalInfo",
    data() {
      return {
        name: '',
        role: ''
      }
    },
    methods: {
      loadUserInfo() {
        console.log("123");
        let userInfo = this.$config.getSession("currentUser")
        this.name = userInfo.loginName
        this.role = userInfo.name
      },
      updatePW() {
        this.$emit('updatePW')
      },
      cancel() {
        this.$emit("cancel")
      }
    }
  }
</script>

<style scoped>
  .updatePassword {
    width: 250px;
    height: 80%;
    position: absolute;
    right: 0;
    background-color: white;
    box-shadow: -6px 8px 7px -6px #888888;
    z-index: 1000;
  }

  .gerenxinxi{
    font-weight: bold;
    font-size: 18px;
    margin-top: 20px;
  }
  .juzhong {
    text-align: center;
  }
  .xingming{
    margin-top: 10px;
    font-size: 16px;
  }
  .juese{
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 16px;
  }
</style>
