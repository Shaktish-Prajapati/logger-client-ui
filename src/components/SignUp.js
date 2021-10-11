import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './SignUp.css'
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {loginWithEmail} from '../action/AdminAction'
import { useHistory } from 'react-router-dom'
import { adminRegister } from '../action/AdminAction';

const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const adminRegisterReducer = useSelector(state => state.adminRegisterReducer)
    const {loading,error, adminRegInfo} = adminRegisterReducer
    
    const [RegisterForm, setRegisterForm] = useState({
        fullName:null,
        email:null,
        password:null,

        // emailError:null,
        // passwordError:null,
        // confirmPasswordError:null,

        isEyeVisible:false,
        hide:true,
    })

    const [emailError, setemailError] = useState(null)
    const [passwordError, setpasswordError] = useState(null)
    const [confirmPassword, setconfirmPassword] = useState(null)
    const [cpassError, setcpassError] = useState(null)
    const [nameError, setnameError] = useState(null)

    const [passwordHide, setpasswordHide] = useState(true)
    const [cpasswordHide, setcpasswordHide] = useState(true)
    const [isTermsAccepted, setIsTermsAccepted] = useState(false)

    const validateEmail = (email) =>{
        if (!email) {
            setemailError("Please enter your email Id")
                
            console.log('email validate function '+emailError)
            return false
        }
        // console.log("email validate function " + email)
        
        if (email.length) {
            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                console.log("patern test "+pattern.test(email))
                setemailError(
                    
                    "Please enter valid email address."
                )
                return false
            }
        }
        setRegisterForm({
            ...RegisterForm,
            email
        })
        setemailError(null)
        return true  
    }


    const validatePassword = (password)=>{
        console.log("password validate")
        // setRegisterForm({
        //     backendErrorResponse:null
        // })
        if (!password) {
            // isValid = false;
            setpasswordError("Please enter your password.")
            return false
        }
        console.log("password validate function " + RegisterForm.passwordError)
        // if (password !== null) {
        //     var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        //     if (!pattern.test(password)) {
        //         //   isValid = false;
        //         setpasswordError({
        //             ...RegisterForm,
        //             passwordError:"Please enter valid password.",
        //             password:null
        //         })
        //         return false
        //     }
        // }
        if (!confirmPassword ){
            setcpassError(
                "Please enter confirm password!"
            )
            return false
        }
        if (confirmPassword && confirmPassword.length && confirmPassword !== RegisterForm.password){
            setcpassError(
                "Please enter correct password!"
            )
            return false
        }
        setRegisterForm({
            ...RegisterForm,
            password:password
        })
        setconfirmPassword(null)
        setpasswordError(null)
        setcpassError(null)
        return true
    }

    const validateName=(name)=>{
        if(!name){
            setnameError("Please provide your name")
            return false
        }
        setnameError(null)
        return true
    }
    
    
    const handleSubmit = (e)=>{
        // e.preventDefault();
        // this.rememberMe()
        let email=validateEmail(RegisterForm.email)
        // console.log("validate email "+email)
        let password=validatePassword(RegisterForm.password)
        // console.log("validate password "+password)
        let name = validateName(RegisterForm.fullName)
        if (email && password && name) {
            dispatch(adminRegister(RegisterForm.email, RegisterForm.password, RegisterForm.fullName,history))
        }
            console.log("dispatch action working")
        e.preventDefault();

        console.log("handle submit clicked")
        
        console.log(RegisterForm)
    }
    return (
        <div className='Register-card justify-content-center'>
            <div className='Register-title'>
               <p className='className="d-flex justify-content-center' style={{fontSize:'3rem'}}>Register</p>
            </div>
            <div className="RegisterForm-card">
                <form >
                    {/* <p className="d-flex justify-content-center">Login</p> */}
                    {/* {
                        error && error.length ? <small style={{color:'red'}}>{error}</small> :''
                    } */}
                    <div className="mb-3">
                    <input 
                    type="text" 
                    className="form-control RegisterForminput" 
                    id="exampleInputEmail1" 
                    placeholder="Enter your name" 
                    aria-describedby="emailHelp"
                    style={{paddingLeft:'25px'}}
                    onChange={(e)=>setRegisterForm({...RegisterForm,fullName:e.target.value})} 
                    value={RegisterForm.fullName}
                    />
                    <span> <i  className="fas fa-user icon-left"></i></span>
                    {
                        nameError ? <small style={{color:'red'}}>{nameError}</small> :''
                    }
                </div>

                <div className="mb-3">
                    <input 
                    type="email" 
                    className="form-control RegisterForminput " 
                    id="exampleInputEmail1" 
                    placeholder="Enter your email" 
                    aria-describedby="emailHelp"
                    style={{paddingLeft:'25px'}}
                    onChange={(e)=>setRegisterForm({...RegisterForm,email:e.target.value})} 
                    value={RegisterForm.email}
                    />
                    <span> <i  className="fas fa-envelope icon-left"></i></span>
                        {
                            emailError && emailError.length ? <small style={{color:'red'}}>{emailError}</small> :''
                        }
                </div>

                <div className="mb-3">
                    <input 
                    type={passwordHide? "password":"text"} 
                    className="form-control RegisterForminput " 
                    id="exampleInputEmail1" 
                    placeholder="Enter your password" 
                    aria-describedby="emailHelp"
                    style={{paddingLeft:'25px'}}
                    onChange={(e)=>setRegisterForm({...RegisterForm,password:e.target.value})} 
                    value={RegisterForm.password}
                    />
                    <span><i  className="fas fa-lock icon-left"></i> 
                    <i onClick={()=>setpasswordHide(!passwordHide)} className={passwordHide ? "fas fa-eye-slash icon-right":" fas fa-eye icon-right"}></i></span>
                    {
                        passwordError !=null ? <small style={{color:'red'}}>{passwordError}</small> :''
                    }
                </div>

                <div className="mb-3">
                    <input 
                    type={cpasswordHide? "password":"text"} 
                    className="form-control RegisterForminput " 
                    id="exampleInputEmail1" 
                    placeholder="Confirm your password" 
                    aria-describedby="emailHelp"
                    style={{paddingLeft:'25px'}}
                    onChange={(e)=>setconfirmPassword(e.target.value)} 
                    value={confirmPassword}
                    />
                    <span><i  className="fas fa-lock icon-left"></i> 
                    <i onClick={()=>setcpasswordHide(!cpasswordHide)}  className={cpasswordHide ? "fas fa-eye-slash icon-right":" fas fa-eye icon-right"}></i></span>
                    {
                        cpassError && cpassError.length !=null ? <small style={{color:'red'}}>{cpassError}</small> :''
                    }
                </div>

                {/* <Row style={{width:'100%', marginBottom:'10%', float:'left'}}>
                    <Col>

                    <Form.Check 
                    type="checkbox" 
                    style={{float:'left', color:'#7D7D7D'}}
                    checked={isTermsAccepted}
                    onChange={()=> setIsTermsAccepted(!isTermsAccepted)} label="I agree term and Condition" 
                    />

                    </Col>
                   
                    </Row> */}

                <button 
                type="submit" 
                style={{
                    background:'#3E8BE2', 
                    color:'#fff', 
                    borderRadius:'10px', 
                    fontStyle:"normal normal 600 23px/34px Poppins;"}} 
                className="btn col w-50 mt-4"
            onClick={(e)=>handleSubmit(e)}
            >
            {
                loading? 'Loading...':'Register'
            }
            
            </button>
                </form>
            </div>
         </div>
         
    )
}

export default SignUp
