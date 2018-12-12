import {instance} from './base.js'

//登录
export const requestLogin = params => { return instance.post(`/login`, params) };
//获取所有用户
export const getUser = (params) => { return instance.get(`/user`, {params}) };
//增加或者修改用户
export const addOrUpdateUser = (params) => { return instance.post(`/user`, params) };
//删除用户
export const deleteUser = (params) => { return instance.delete(`/user/` + params) };
//重置密码
export const resetUserPassword = (params) => { return instance.post(`/user/resetPassword/` + params) };
//得到所有角色
export const getRole = () => { return instance.get(`/role`) };
//得到用户角色
export const getUserRole = (params) => {return instance.get(`/user/roleList/` + params)};
//保存用户角色
export const saveUserRoles = (params) => { return instance.post(`/user/saveRoles`, params)};
//增加角色
export const addRole = params => { return instance.post('/role',params) }
//得到菜单
export const findMenuById = params =>{ return instance.get('/role/menuIds/'+params)}
//得到所有vo菜单
export const getMenuVo = () => { return instance.get(`/menu/menuVo`) };
//为角色保存菜单
export const saveMenu = params => { return instance.post('/role/saveMenu',params) }
//删除角色
export const deleteRole = params =>{ return instance.delete('role/'+params) }
//得到所有菜单
export const getMenu = () => { return instance.get(`/menu`) };
//增加修改菜单
export const addOrUpdateMenu = (params) => { return instance.post(`/menu`, params) };
//删除菜单
export const deleteMenu = (params) => { return instance.delete(`/menu/` + params) };
// //得到所有字典
// export const getDictionaryByPage = (params) => {return instance.get(`/dictionary/listByPage`,{params})};
// //增加修改字典
// export const addOrUpdateDictionary = (params) => {return instance.post(`/dictionary/save`,params)};
// //删除菜单信息
// export const deleteDictionary = (params) => {return instance.post(`/dictionary/delete`,params)};
// //设置默认
// export const isDefaultDictionary = (params1,params2) => {return instance.post(`/dictionary/setDefault/`+params1+"/"+params2)};
// //角色管理
// export const roleList = ()=>{ return instance.post('/role/list')}



// //获取文章首页信息
// export const getArticleByPage = (params) => {return instance.get(`/article/findByPage`,{params})};
// //删除文章
// export const deleteArticle = (params) => { return instance.post(`/article/deleteById`, params) };
// //添加修改文章
// export const addArticle = (params) => { return instance.post(`/articleStatic/index`, params) };
// //静态化所有文章
// export const staticAllArticle = ()=>{ return instance.post('/articleStatic/allStatic')}
// //添加文章时下拉框
// export const getArticleColumns = () => { return instance.post(`/article/findAllColumns`) };
// // 加载模板文件树
// export const loadFileTree = (params) => { return instance.post('/template/list',params)}
// //获取文件下的所有文件
// export const readFile = (params) => { return instance.post('/template/readisDirectory',params)}
// //读取文件内容
// export const getFileContent = (params) =>{return instance.post('/template/readOneFile',params)}
// //创建新的文件目录
// export const createNewDir = (params) =>{return instance.post('/template/createDirectory',params)}
// //创建新的模板
// export const createNewTemplate = (params) =>{return instance.post('/template/createFile',params)}
// //修改模板
// export const updateFileContent = (params) =>{return instance.post('/template/updateFileContent',params)}
// //重命名
// export const reNameFile = (params) =>{return instance.post('/template/reName',params)}
// //删除文件
// export const deleteFileOrDirectory = (params) =>{return instance.post('/template/deleteFileOrDirectory',params)}
// //上传文件
// export const uploadFile = (params) =>{return instance.post('/template/upload',params)}
// ///附件
// export const attachmentList = params=>{ return instance.post('/attachment/list',params)}
// //删除附件
// export const deleteAttachment = params =>{ return instance.post('attachment/delete/'+params) }
// //增加广告
// export const addOrUpdateAdvertisement = params => { return instance.post('/advertisement/save',params) }
// //删除广告
// export const deleteAdvertisement = params =>{ return instance.post('/advertisement/delete',params) }
// //得到所有广告并且分页
// export const getAdvertisementByPage = (params) => {return instance.get(`/advertisement/listByPage`,{params})};
// //获取所有栏目
// export const getColumns = params => {return instance.post('/columns/list')}
// //添加栏目
// export const addColumns = params => { return instance.post('/columns/save',params)}
// //删除栏目
// export const deleteColumns = params =>{ return instance.post('columns/delete/'+params) }
// //查询子栏目
// export const getSubColumns = params =>{return instance.post('/columns/subColumns/'+params)}
// //友情链接//获取所有链接
// export  const getLinks = () =>{return instance.get('/blogroll/list')}
// //友情链接//添加链接
// export const save = params => {return instance.post('/blogroll/save',params)}
// //删除友情链接
// export  const deleteLinks = params => {return instance.post('/blogroll/delete/'+params)}
// //友情链接分页
// export const getlistByPage = (params) => {return instance.get(`/blogroll/listByPage`,{params})};
// //添加文章时模板下拉框
// export const getArticleTemplate = () => { return instance.post(`/template/list`) };
// //栏目静态化
// export const staticColumns = (params) =>{ return instance.post(`/columnsStatic/index`,params)}
// //静态化首页
// export const indexStatic = () =>{return instance.post(`/freemarkerMain/indexStatic`)}
// //全站静态化
// export const allStatic = () =>{return instance.post(`/freemarkerMain/staticSite`)}
// //修改密码
// export const updatePassword = (params) =>{return instance.post('/updatePassword',params)}
