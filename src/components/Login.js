import React,{useState} from 'react';
import {NavLink , useHistory} from 'react-router-dom';

const Login = () =>{
    const history=useHistory();

    const [email , setEmail]=useState("");
    const [password , setPassword] = useState("");

const loginUser = async(e)=>{
e.preventDefault();

const res = await fetch('/signin' , {
    method:"POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body:JSON.stringify({
        email,
        password
    })
});
const data=res.json();

if (res.status ===400 || !data){
    window.alert("Invalid Credentials");
    }else{
        window.alert("login successfull");
        history.push("/");
    }
}
    return (
        <>
        <h1>WELCOME LOGIN PAGE</h1>
        <NavLink to='/signup' className='signin-image-link'>Create an account</NavLink>

        <form method="POST">
        <input type='email' name='email' id='email' autoComplete='off' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder='Your Email' />
        <input type='password' name='password' id='password' autoComplete='off' 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='Your Password' />
        <input type='submit' name='signin' id='signin'  classNane='form-submit' value='Login' onClick={loginUser} />
</form>
        </>
    )
}
export default Login;