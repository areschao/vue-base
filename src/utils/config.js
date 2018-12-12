import Vue from 'vue'
import ElementUI from 'element-ui'

export const baseHost = 'http://192.168.1.47:8082'
// export const baseHost = 'http://192.168.43.61:8080'
export const executeResult = (httpResult) => {
  switch (httpResult.code) {
    case 0:
      return true;
    case 3:
      toLoginPageFn();
      break;
    case 4:
    case 5:
      warningMessage("没有权限访问", httpResult.codeMsg);
      toLoginPageFn();
      break;
    case 6:
      warningMessage("系统消息", httpResult.codeMsg);
      break;
    case 10:
      errorMessage("系统消息", httpResult.operationContentDetails);
      return false;
    case 12:
      warningMessage("系统消息", httpResult.operationContentDetails);
    case 13:
      warningMessage("系统消息", httpResult.operationContentDetails);
      return false;
    case -1:
      warningMessage(httpResult.codeMsg, httpResult.operationContentDetails);
      return false;
    default:
      warningMessage("系统消息", httpResult.operationContentDetails);

  }
}

export const toLoginPageFn = () => {
  ElementUI.MessageBox.confirm('用户过期,返回登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    Vue.$router.push({name: 'login'})
  }).catch(() => {
    Vue.$router.push({name: 'login'})
  })

}

export const warningMessage = (title, message) => {
  ElementUI.Message.warning(
    title != null && message != null ? title + ":" + message : title
  )
}

export const errorMessage = (title, message) => {
  ElementUI.Message.error(
    (title != null && message != null) ? title + ":" + message : title
  )
}

export const successMessage = (title, message) => {
  ElementUI.Message.success(
    title != null && message != null ? title + ":" + message : title
  )
}

export const setSession = (key, val) => {
  val = typeof(val) !== 'string' ? JSON.stringify(val) : val
  sessionStorage.setItem(key, val)
}

export const getSession = (key) => {
  return JSON.parse(sessionStorage.getItem(key))
}

export const copyObject = (src, desc) => {
  for (name in desc) {
    desc[name] = src[name];
  }
}

export const resetForm = (formName) => {
  console.log(Vue.$refs[formName])
  if (typeof (Vue.$refs[formName]) !== 'undefined') {
    Vue.$refs[formName].resetFields()
  }
}

//格式化时间
export const formatTime = (fmt, time) => {
  var date = new Date(time);
  let o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}





