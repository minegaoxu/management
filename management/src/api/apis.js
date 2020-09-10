import axios from 'axios'

const IP = 'http://127.0.0.1:5000'
// 商品图片上传ip
export const Img_Updata = IP + '/goods/goods_img_upload'
// 店铺图片上传ip
export const Img_Upshop = IP + '/shop/upload'
// 商品图片获取ip
export const Img_Getdata = IP + '/upload/imgs/goods_img/'
// 店铺图片获取ip
export const Img_Getshop = IP + '/upload/shop/'
// 设置基本路径
axios.defaults.baseURL = IP
//------------------------------- 用户类接口 ---------------------------------//
// 1.登录接口
export const login = (account, password) => axios.post('/users/checkLogin', { account, password })
// 2.token接口
export const aging = (token) => axios.get('/users/checktoken', { params: { token } })
// 3.添加账号
export const adduser = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })
// 4.获取账号列表接口
export const lookUser = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })
// 5.删除账号接口
export const removeuser = (id) => axios.get('/users/del', { params: { id } })
// 6.批量删除账号接口
export const delusers = (ids) => axios.get('/users/batchdel', { params: { ids } })
// 7.修改账号接口
export const changeuser = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })
// 8.检查旧密码是否正确接口
export const checkoldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })
// 9.修改密码接口
export const editpwd = (newPwd, id) => axios.post('/users/editpwd', { newPwd, id })
// 10.个人中心接口
export const accountinfo = (id) => axios.get('/users/accountinfo', { params: { id } })
// 11.头像上传接口
export const avatar_upload = (id) => axios.post('/users/avatar_upload', { id })

//------------------------------- 商品管理接口 ---------------------------------//
// 12.添加分类
export const addcate = (cateName, state) => axios.post('/goods/addcate', { cateName, state })
// 13.获取分类
export const catelist = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })
// 14.删除分类
export const delcate = (id) => axios.get('/goods/delcate', { params: { id } })
// 15.修改分类
export const editcate = (scope) => axios.post('/goods/editcate', scope)
// 16.查询所有分类名称
export const categories = () => axios.get('/goods/categories', { params: {} })
// 17.商品图片上传接口
export const goods_img_upload = () => axios.post('/goods/goods_img_upload', {})
// 18.添加商品
export const add = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })
// 19.获取商品列表
export const goodslist = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })
//20.删除商品
export const goodsdel = (id) => axios.get('/goods/del', { params: { id } })
//21.修改商品
export const edit = (params) => axios.post('/goods/edit', params)

//------------------------------- 订单管理类接口 ---------------------------------//
// 22.获取订单列表(带查询功能)
export const orderlist = (params) => axios.get('/order/list', { params })
// 23.查询
export const search = (currentPage, pageSize, parmas) => axios.get('/order/search', { params: { currentPage, pageSize, parmas } })
// 24.获取订单详情
export const orderDetails = (id) => axios.get('/order/detail', { params: { id } })
//25.修改订单
export const orderEdit = (params) => axios.post('/order/edit', params)

//------------------------------- 店铺管理类接口 ---------------------------------//

//26.获取店铺详情
export const shopDetails = () => axios.get('/shop/info', { params: {} })
//27.店铺图片上传接口
export const shopUpImg = () => axios.post('/shop/upload', {})
//28.店铺内容修改
export const shopEdit = (params) => axios.post('/shop/edit', params)


//------------------------------- 报表类接口 ---------------------------------//

//29.首页报表接口
export const reportIndex = () => axios.get('/order/totaldata', { params: {} })
//30.订单报表接口
export const reportOrder = (date) => axios.get('/order/ordertotal', { params: { date } })