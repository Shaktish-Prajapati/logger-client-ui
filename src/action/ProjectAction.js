import axios from 'axios'
import {
    GET_PROJECT_REQUEST,
    GET_PROJECT_REQUEST_SUCCESS,
    GET_PROJECT_REQUEST_FAIL,

    GET_ALL_LOG_BY_CODE_REQUEST,
    GET_ALL_LOG_BY_CODE_SUCCESS,
    GET_ALL_LOG_BY_CODE_FAIL,

    UPLOAD_NEW_PROJECT_REQUEST,
    UPLOAD_NEW_PROJECT_REQUEST_SUCCESS,
    UPLOAD_NEW_PROJECT_REQUEST_FAIL
} from '../constants/ProjectConstants'

export const getAllProject = () => async (dispatch)=>{
    try {
        dispatch({type:GET_PROJECT_REQUEST})
        const token = localStorage.getItem("ddAdminToken")
        console.log(token)
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }

        console.log(config)

        // const {data} = await axios.get('https://agvalogger.herokuapp.com/api/logger/projects/',
        // config
        // )

        const {data} = await axios.get(`https://logger-server.herokuapp.com/api/logger/projects/`,
        config
        )
        console.log(data)
        dispatch({
            type: GET_PROJECT_REQUEST_SUCCESS, 
            payload:data
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: GET_PROJECT_REQUEST_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message : error.message,
        })
    }
}

export const getProjectByCode = (code)=>async(dispatch)=>{
    try {
    dispatch({type:GET_ALL_LOG_BY_CODE_REQUEST})
    const token = localStorage.getItem("ddAdminToken")
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }

        console.log(config)

        // const {data} = await axios.get('https://agvalogger.herokuapp.com/api/logger/projects/',
        // config
        // )

        const {data} = await axios.get(`https://logger-server.herokuapp.com/api/logger/projects/getDetail/${code}`,
        config
        )
        console.log(data)
        dispatch({
            type: GET_ALL_LOG_BY_CODE_SUCCESS, 
            payload:data
        })

    } catch (error) {
        console.log(error.response)
        dispatch({
            type: GET_ALL_LOG_BY_CODE_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message : error.message,
        })
    }
}

export const uploadNewProject = (name, modelList, desc)=>async(dispatch)=>{
    try {
        dispatch({type:UPLOAD_NEW_PROJECT_REQUEST})
        
        const token = localStorage.getItem("ddAdminToken")
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
    
            console.log(config)
    
            // const {data} = await axios.get('https://agvalogger.herokuapp.com/api/logger/projects/',
            // config
            // )
    
            const {data} = await axios.post(`https://logger-server.herokuapp.com/api/logger/projects/`,{
                name:name,
                description:desc,
                device_type:modelList
            },
            config
            )
            console.log(data)
            dispatch({
                type: UPLOAD_NEW_PROJECT_REQUEST_SUCCESS, 
                payload:data
            })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: UPLOAD_NEW_PROJECT_REQUEST_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message : error.message,
        })
    }
}