import React, { useState } from 'react'
import '../../Styles/Header.css'
import Modal from 'react-modal'

const customStyles = {
    content: {
      top: '50%',
      left: '50%', 
      right: 'auto',
      bottom: 'auto',
      padding: '2%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function (props) {
    if(!props.show ) 
        {return null}
    

      const [inputval,setInputval]= useState({
        name:"",
        emailId:"",
        password: "",
        passwordCheck:""
      })
      
      

      const getData = (e) => {
        const {value,name}=e.target;
        setInputval(()=>{
                          return {...inputval,[name]:value}
                        })
      
      };

      const fetchApi=async (Name,email,password)=>{
                                //http://localhost:8080
        let result = await fetch('https://sagar-zomato-clone.herokuapp.com/user/signup',{
          method:'post',
          body: JSON.stringify({name:Name,email:email,password:password}),
          headers:{
            'Content-Type':'application/json'
          }
        })
      result= await result.json();
      // console.warn(result)    
        localStorage.setItem("User",JSON.stringify(result))
        alert("Signup successful")
      
      }

      const addData= (e)=>{
        e.preventDefault();
       
        const {name,emailId,password,passwordCheck}=inputval;
        if(emailId=='') alert("Email id is required")
        else if(password=='') alert("Enter the password")
        else if(!emailId.includes('@')) alert("Please enter valid email address")
        else if(passwordCheck == '') alert ('Please enter the confirm password')
        else if(password!==passwordCheck) alert('Password and confirm password is not same')
        else{
          console.log("signup successful")
        //   localStorage.setItem("zomatoUser",JSON.stringify([...data,inputval]))
          fetchApi(name,emailId,password);
         
        }
        props.onClose()
        }
      
//   const [isCreateAccountOpen, setIsCreateAccount] = useState(false)
    return (

        <div>
            {/* Create account Modal  */}
            <Modal 
                isOpen={props.show}
                style={customStyles}
                >
                <div className='createAcc-Modal' >
                    <h2 >Create An Account &nbsp;&nbsp;
                        <button className='btn btn-danger' style={{float:'right',width:'40px'}} onClick={props.onClose}>&times;</button>
                    </h2>
                </div>

                <div className='createAcc'>
                <form >
                    <input type={"text"} name="name" onChange={getData} placeholder='Enter your name' /> <br /><br />
                    <input type={"email"} name="emailId" onChange={getData} placeholder='Enter your email' /> <br /><br />
                    <input type={"password"} name="password" onChange={getData} placeholder='Enter your password' /><br /><br />
                    <input type={"password"} name="passwordCheck" onChange={getData} placeholder='Confirm password'  /><br /><br />
                    <button className='btn btn-success px-3' onClick={addData}>Create Account</button>
                </form>
                </div>
            </Modal>
        </div>
    )
}
