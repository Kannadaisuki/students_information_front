import request from "~/utils/request"

/**
 * @description 获取学生信息列表
 * @param data
 */
export function stuInfoList(data: object){
    return request({
        url: '/findStudentList',
        method: 'post',
        data
    })
}

/**
 * @description 删除学生信息
 * @param data
 */
export function deleteStu(data: object){
    return request({
        url: '/deleteStudent',
        method: 'delete',
        data
    })
}

/**
 * @description 添加学生信息
 * @param data
 */
export function addStu(data: object){
    return request({
        url: '/addStudent',
        method: 'post',
        data
    })
}
