import request from "~/utils/request"

/**
 * @description:
 */
export function stuInfoList(data: object){
    return request({
        url: '/findStudentList',
        method: 'post',
        data
    })
}
