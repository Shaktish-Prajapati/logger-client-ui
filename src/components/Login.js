import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Login.css'
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {loginWithEmail} from '../action/AdminAction'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        isRemeberMe:false,
        email:null,
        password:null
    })
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [ispasswordHide, setIspasswordHide] = useState(true)

     const dispatch = useDispatch()
     const adminLoginReducer = useSelector(state => state.adminLoginReducer)
     const {loading,error, adminInfo} = adminLoginReducer
    
     const history = useHistory();
     useEffect(() => {
         if(localStorage.getItem("ddAdminToken")){
             history.push('/home')
         }
     }, [history, adminInfo])

     const validateEmail = (email) =>{
        if (!email) {
            setEmailError("Please enter your email Id")
                
            console.log('email validate function '+emailError)
            return false
        }
        // console.log("email validate function " + email)
        
        if (email.length) {
            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                console.log("patern test "+pattern.test(email))
                setEmailError(
                    
                    "Please enter valid email address."
                )
                return false
            }
            // return true
        }
        setLoginForm({
            ...loginForm,
            email
        })
        setEmailError(null)
        return true  
    }


    const validatePassword = (password)=>{
        console.log("password validate")
        // setRegisterForm({
        //     backendErrorResponse:null
        // })
        if (!password) {
            // isValid = false;
            setPasswordError("Please enter your password.")
            return false
        }
        console.log("password validate function " + passwordError)
        if (password !== null) {
            var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            // if (!pattern.test(password)) {
            //     //   isValid = false;
            //     setPasswordError(
            //         "Please enter valid password.",
            //     )
            //     return false
            // }
            // return true
        }
        
        
        setLoginForm({
            ...loginForm,
            password:password
        })
        setPasswordError(null)
        return true
    }
    
    const rememberMe = ()=>{
        localStorage.setItem('rememberMe', 'Shaktish');
        localStorage.setItem('adminUserName', loginForm.isRemeberMe ? loginForm.email  : '');
        localStorage.setItem('adminUserCredential', loginForm.isRemeberMe ? loginForm.password : '');        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if (loginForm.isRemeberMe) {
            // rememberMe()
        // }
        const email = validateEmail(loginForm.email)
        const password = validatePassword(loginForm.password)
        if (email && password) {
            dispatch(loginWithEmail(loginForm.email, loginForm.password, loginForm.isRemeberMe))
        }
        console.log("dispatch action working")
    }

    // useEffect(() => {
    //     if(localStorage.getItem('adminUserName') && localStorage.getItem('adminUserCredential')){
    //         console.log(localStorage.getItem('adminUserName'))
    //         setLoginForm({
    //             email:localStorage.getItem('adminUserName'),
    //             password:localStorage.getItem('adminUserCredential'),
    //             isRemeberMe:true
    //         })
    //     }
    // }, [])
    return (
        <div className='Login-card justify-content-center'>
            <div className='Login-title'>
               <p className='className="d-flex justify-content-center' style={{fontSize:'3rem'}} >Login</p>
            </div>
            <div className="Form-card">
                <form >
                    {/* <p className="d-flex justify-content-center">Login</p> */}
                    {
                        error && error.length ? <small style={{color:'red'}}>{error}</small> :''
                    }
                <div className="mb-3">
                    <input 
                    type="email" 
                    className="form-control LoginForminput " 
                    id="exampleInputEmail1" 
                    placeholder="Enter your email" 
                    aria-describedby="emailHelp"
                    style={{paddingLeft:'25px'}}
                    onChange={(e)=>setLoginForm({...loginForm,email:e.target.value})} 
                    value={loginForm.email}
                    />
                    <span> <i  className="fas fa-envelope icon-left"></i></span>
                        {
                            emailError && emailError.length ? <small style={{color:'red'}}>{emailError}</small> :''
                        }
                </div>

                <div className="mb-3">
                    <input 
                    type={ispasswordHide? "password":"text"} 
                    className="form-control LoginForminput " 
                    id="exampleInputEmail1" 
                    placeholder="Enter your password" 
                    aria-describedby="emailHelp"
                    style={{paddingLeft:'25px'}}
                    value={loginForm.password}
                    onChange={(e)=>setLoginForm({...loginForm,password:e.target.value})}
                    />
                    <span><i  className="fas fa-lock icon-left"></i> 
                <i onClick={()=>setIspasswordHide(!ispasswordHide)} className={ispasswordHide ? "fas fa-eye-slash icon-right":" fas fa-eye icon-right"}></i></span>
                {
                    passwordError !=null ? <small style={{color:'red'}}>{passwordError}</small> :''
                }
                </div>
                <Row style={{width:'100%', marginBottom:'10%'}}>
                    <Col>

                    <Form.Check 
                    type="checkbox" 
                    style={{float:'left'}}
                    checked={loginForm.isRemeberMe}
                    onChange={()=> setLoginForm({...loginForm, isRemeberMe:!loginForm.isRemeberMe})} label="Remember me" 
                    />

                    </Col>
                    <Col /* style={{paddingRight:'0px'}} */>
                    <Link to='/' 
                    style={{
                        paddingRight:'0px',
                        marginRight:'0px',
                        textDecoration:'none', 
                        float:'right', 
                        font: 'normal normal medium 18px/27px Poppins'
                        }} >Forget Password?</Link>
                    </Col>
                    </Row>

                <button 
                type="submit" 
                style={{
                    background:'#3E8BE2', 
                    color:'#fff', 
                    borderRadius:'10px', 
                    fontStyle:"normal normal 600 23px/34px Poppins;"}} 
                className="btn col w-50"
            onClick={(e)=>handleSubmit(e)}
            >
            {
                loading? 'Loading...':'Login'
            }
            
            </button>
                </form>

            </div>
         </div>
    )
}

export default Login
