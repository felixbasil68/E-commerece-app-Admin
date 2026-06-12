import axios from "axios";

const commonAPI=async(http,url,reqBody,reqHeader,)=>{
    const reqConfig={
        method:http,
        url,
        data:reqBody,
        headers:reqHeader

    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch(error=>{
        return error
    })
}
export default commonAPI