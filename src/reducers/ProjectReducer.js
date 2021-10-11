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


export const getAllProjectReducer= (state={},action)=>{
    switch (action.type) {
        case GET_PROJECT_REQUEST:
            return {
                loading:true
            }
        case GET_PROJECT_REQUEST_SUCCESS:
            return {
                loading:false,
                allProjectData: action.payload
            }
        case GET_PROJECT_REQUEST_FAIL:
            return {
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getAllLogByCodeReducer = (state={},action)=>{
    switch (action.type) {
        case GET_ALL_LOG_BY_CODE_REQUEST:
            return {
                loading:true
            }
        case GET_ALL_LOG_BY_CODE_SUCCESS:
            return {
                loading: false,
                data : action.payload
            }
        case GET_ALL_LOG_BY_CODE_FAIL:
            return {
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}

export const createNewProjectReducer = (state={} ,  action)=>{
    switch (action.type) {
        case UPLOAD_NEW_PROJECT_REQUEST:
            return {loading:true}

        case UPLOAD_NEW_PROJECT_REQUEST_SUCCESS:
            return {
                loading:false,
                data: action.payload
            }
        case UPLOAD_NEW_PROJECT_REQUEST_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}