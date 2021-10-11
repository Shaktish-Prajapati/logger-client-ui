import React from 'react'
import './SpinLoader.css'

const SpinLoader = () => {
    return (
        <>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <h5 style={{color:'#212529', paddingTop:'2%'}}>Loading...</h5>
        </>
    )
}

export default SpinLoader
