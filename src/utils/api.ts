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

/**
 * @description 添加学生奖励信息
 * @param data
 */
export function addReward(data: object){
    return request({
        url: '/addReward',
        method: 'post',
        data
    })
}

/**
 * @description 获取学籍异动信息列表
 * @param data
 */
export function changeInfoList(data: object){
    return request({
        url: '/findChangeList',
        method: 'post',
        data
    })
}

/**
 * @description 删除学籍异动信息
 * @param data
 */
export function deleteChange(data: object){
    return request({
        url: '/deleteChange',
        method: 'delete',
        data
    })
}

/**
 * @description 新增学籍异动信息
 * @param data
 */
export function addChange(data: object){
    return request({
        url: '/addChange',
        method: 'post',
        data
    })
}

/**
 * @description 获取学生惩罚信息列表
 * @param data
 */
export function punishmentList(data: object){
    return request({
        url: '/findPunishmentList' ,
        method: 'post',
        data
    })
}

/**
 * @description 删除学生惩罚信息
 * @param data
 */
export function deletePunishment(data: object){
    return request({
        url: '/deletePunishment',
        method: 'delete',
         data
    })
}

/**
 * @description 新增学生惩罚信息
 * @param data
 */
export function addPunishment(data: object){
    return request({
        url: '/addPunishment',
        method: 'post',
        data
    })
}

/**
 * @description 修改惩罚状态
 * @param data
 */
export function changeState(data: object){
    return request({
        url: '/setPunishmentTF',
        method: 'post',
        data
    })
}


export function detail(data: object){
    return request({
        url: '/findStudentAllInfo',
        method: 'post',
        data
    })
}
