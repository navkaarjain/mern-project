import React,{useState} from 'react';
import {NavLink , useHistory} from 'react-router-dom';

const Signup = () =>{
const history = useHistory();
const [user,setUser]=useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""});

    let name,value;

    const handleInputs = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }

    const PostData = async (e)=>{
        e.preventDefault();

        const{ name ,email, phone, work, password, cpassword } = user;

        const res= await fetch("/register",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name ,email, phone, work, password, cpassword 
            })
        });

        const data= await res.json();

        if (data.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("invalid registration");
        }else{
            window.alert("Registration successfull");
            console.log("successfull registration");

            history.push("/login");
        }
    }

    return (
        <>
        <div>
        <h1>WELCOME TO SIGNUP PAGE</h1>
        <form method="POST" className="register-form" id="register-form">
        <input type='text' name='name' id='name' autoComplete='off' value={user.name} onChange={handleInputs} placeholder='Your Name' />
        <input type='email' name='email' id='email' autoComplete='off' value={user.email} onChange={handleInputs} placeholder='Your Email' />
        <input type='number' name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handleInputs} placeholder='Your Phone' />
        <input type='text' name='work' id='work' autoComplete='off' value={user.work} onChange={handleInputs} placeholder='Your Profession' />
        <input type='password' name='password' id='password' autoComplete='off' value={user.password} onChange={handleInputs} placeholder='Your Password' />
        <input type='password' name='cpassword' id='cpassword' autoComplete='off' value={user.cpassword} onChange={handleInputs} placeholder='Confirm Your Password' />
        </form>


        </div>

        <div className='form-group form-button'> 
        <input type='submit' name='signup' id='signup'  classNane='form-submit' value='register' onClick={PostData} />
        </div>

        <NavLink to='/login' className='signup-image-link'>i am already register</NavLink>

        </>
    )
}
export default Signup;