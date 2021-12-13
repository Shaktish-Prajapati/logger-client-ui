import axios from 'axios';
import cookie from 'react-cookies';
import { useHistory } from 'react-router';


import { 
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
    ADMIN_LOGOUT_FAIL,
    
    ADMIN_REGISTER_REQUEST,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAIL
} from '../types/AdminConstants'


import { persistor } from '../Store';
// const dotenv = require('dotenv')

// dotenv.config()


export const loginWithEmail = (email, password, isRemeberMe) => async (dispatch)=>{
    console.log(email, password)
    try {
        dispatch({type:ADMIN_LOGIN_REQUEST});
        const config = {
            header: {
                "Content-type": "application/json"
            },
        }

        console.log(email, password, isRemeberMe)
        // const {data} = await axios.post('https://agvalogger.herokuapp.com/api/logger/login',{
        //     email,
        //     password
        // },
        // config
        // )
        // https://logger-server.herokuapp.com
        console.log(process.env.BASE_URL)

        const {data} = await axios.post(`https://logger-server.herokuapp.com/api/logger/login`,{
            email,
            password
        },
        config
        )
        console.log(data)
        dispatch({
            type: ADMIN_LOGIN_SUCCESS, 
            payload:data
        })

        // isRemeberMe ? localStorage.setItem("adminInfo", JSON.stringify(data)):''
        if (isRemeberMe) {
            
        }
        console.log(data)
        localStorage.setItem("ddAdminToken", data.data.token)
        cookie.save('token',data.data.token)

    } catch (error) {
        console.log(error.response)
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload:
            error.response && error.response.data.data 
            ? error.response.data.data.err.msg : error.message,
        })
    }
}

export const adminLogout = (history) => async (dispatch)=>{
    try {
        
        // localStorage.removeItem('adminInfo');
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('ddAdminToken')}`
            },
        }
        
        // const {data} = await axios.post('https://agvalogger.herokuapp.com/api/logger/logout',
        // config
        // )

        await axios.get(`https://logger-server.herokuapp.com/api/logger/logout`,
        config
        )
        
        
        localStorage.removeItem('ddAdminToken')
        await persistor.purge()
        
        history.push('/')
        dispatch({
            type:ADMIN_LOGOUT
        })

    } catch (error) {
        dispatch({
            type: ADMIN_LOGOUT_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message : error.message,
        })
    }
}


// ****************** ADMIN REGISTER ACTIONS *************************
export const adminRegister = (email,password,name,history) => async (dispatch)=>{
    
    try {
        dispatch({
            type: ADMIN_REGISTER_REQUEST
        })

        const config = {
            header: {
                "Content-type": "application/json"
            },
        }
        // https://insulink-backend.herokuapp.com
        const {data} = await axios.post('https://logger-server.herokuapp.com/api/logger/register',{
            name,
            email,
            password,
        },
        config)

        dispatch({
            type: ADMIN_REGISTER_SUCCESS, 
            payload:data
        })

        localStorage.setItem("adminInfo", data)
        // cookie.save('token',data.user.token)
        history.push('/')


    } catch (error) {
        console.log(error.response)
        dispatch({
            type: ADMIN_REGISTER_FAIL,
            payload:
            error.response && error.response.data.errorMessage 
            ? error.response.data.errorMessage : error.message,
        })
    }
}