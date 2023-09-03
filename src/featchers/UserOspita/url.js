import { requestRegisterUserValentano } from "../../anstanceUrl/request"
import { axiosInstance } from "../../anstanceUrl/urlInstance"



export const AllFunction = {
    register: (data) => {

        return axiosInstance({
            url: requestRegisterUserValentano.registerUserValentano,
            method: 'post',
            credentials: 'include',
            body: data
        }).then((res) => {
            return res
        }).catch((err) => {
            return err
        })
    },

    login: (data,viewport) => {
        console.log(data)
        console.log(viewport)
        return axiosInstance({
            url: `${requestRegisterUserValentano.loginUserValentano}/?lan=${viewport.latitude}&lg=${viewport.longitude}`,
            method: 'post',
            credentials: 'include',
             data
        }).then((res) => {
            console.log(res)
            return res
        }).catch((err) => {
            return err
        })
    },

    ///////////////this function for ragazzo

    loginRagazzo:(data,viewport,key)=>{
        console.log(key)
        
        return axiosInstance({
            // requestRegisterUserValentano.loginRagazzoValentano
            url:`${requestRegisterUserValentano.loginRagazzoValentano}/?lan=${viewport.latitude}&lg=${viewport.longitude}&keySecret=${key}`,
            method:'post',
            credentials:'include',
            data
        }).then((res) => {
            console.log(res)
            return res
        })
    },

    RegisterRagazzo:(data)=>{
        return axiosInstance({
            // requestRegisterUserValentano.loginRagazzoValentano
            url:requestRegisterUserValentano.registerRagazzoValentano,
            method:'post',
            credentials:'include',
            data
        }).then((res) => {
            console.log(res)
            return res.data
        }).catch((err) => {
            return err
        })
    }


}

