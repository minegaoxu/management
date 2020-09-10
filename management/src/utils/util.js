
// 获取中国时间函数
export const getchinaTime = (time) => {
    let date = (typeof time == "string" ? new Date(time) : time)
    // 判断是否为字符串
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

}
// 获取中国时间函数( 小时,分钟 )
export const getchinaTimeHours = (time) => {
    let day = new Date(time)
    return day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds()
}