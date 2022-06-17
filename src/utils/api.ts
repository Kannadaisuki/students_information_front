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

/**
 * @description 获取所有院系名称
 */
export function getDept(){
    return request({
        url: '/getDept',
        method: 'post'
    })
}

/**
 * @description 通过学院获取班级
 * @param data
 */
export function getClassByDept(data: object){
    return request({
        url: '/getClassByDept',
        method: 'post',
        data
    })
}

/**
 * @description 编辑学生信息
 * @param data
 */
export function editStuInfo(data: object){
    return request({
        url: '/updateStudent',
        method: 'post',
        data
    })
}

/**
 * @description 获取学生奖励信息列表
 * @param data
 */
export function rewardInfoList(data: object){
    return request({
        url: '/findRewardList',
        method: 'post',
        data
    })
}

/**
 * @description 删除学生奖励信息
 * @param data
 */
export function deleteReward(data: object){
    return request({
        url: '/deleteReward',
        method: 'delete',
        data
    })
}


export function addReward(data: object){
    return request({
        url: '/addReward',
        method: 'post',
        data
    })
}
