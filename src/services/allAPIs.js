import commonAPI from "../services/commonAPI"
import { serverURL } from "../services/ServerURL"

//  Login
export const adminLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/api/user/admin`, reqBody)
}
// add Product
export const addProductAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${serverURL}/api/product/add`, reqBody,reqHeader)
}

// list product

export const getProductListAPI = async () => {
    return await commonAPI("GET", `${serverURL}/api/product/list`, "")
}
// remove Product
export const removeProductAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/api/product/remove`, reqBody, reqHeader)
}

// list user order
export const getAllUserProductAPI = async (reqHeader) => {
    return await commonAPI("POST", `${serverURL}/api/order/list`, {},reqHeader)
}

// status Update
export const userStatusUpdateAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${serverURL}/api/order/status`, reqBody,reqHeader)
}








