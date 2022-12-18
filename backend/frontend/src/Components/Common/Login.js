import React, { useState } from 'react'
import '../../Styles/Header.css'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

Modal.setAppElement('#root');

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
    if(!props.show){return null}

    // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const fbCallback= (response)=>{
        console.log("Facebook call back response : ",response);
      }
    
      const responseGoogle = (response) => {
        console.log(response);
      }

      const [inputval,setInputval]=useState({
        emailId:"",
        password: ""
      })
  

      const getUserArr=localStorage.getItem("zomatoUser")

      const getData = (e) => {
        const {value,name}=e.target;
        setInputval(()=>{
                          return {...inputval,[name]:value}
                        })
      };
    
      const handleLogin = async (emailId,password) =>{
        let result = await fetch('https://sagar-zomato-clone-app.onrender.com/user/login',{
          method:'post',
          body: JSON.stringify({email:emailId,password:password}),
          headers:{
            'Content-Type':'application/json'
          }
        })
        result= await result.json();
        // console.warn(result)
        if(result.email){
          alert("logged in successfully")
          localStorage.setItem("User",JSON.stringify(result))
          
        }
        else {
          alert("Please enter valid details")
        }
      }

      const addData=(e)=>{
        e.preventDefault();
        // console.log(inputval)
        const {emailId,password}=inputval;
        if(emailId=='') alert("email id is required")
        else if(password=='') alert("enter the password")
        else if(!emailId.includes('@')) alert("please enter valid email address")
        else{
          handleLogin(emailId,password)
          }

        props.onClose()
        }


  return (
    
        <div>
            {/* Login modal  */}
            <Modal 
            isOpen={props.show}
            style={customStyles}
            >
              <div className='login-Modal'>
                <h2 >Login 
                    <button className='btn btn-danger' style={{float:'right'}} onClick={props.onClose}>&times;</button>
                </h2>
            </div>

            <div>
                <form >
                    <input type="email" name="emailId" onChange={getData} placeholder='Enter your email' /><br /><br />
                    <input type="password" name="password" onChange={getData} placeholder='Enter your password' /><br /><br />
                    <button className='btn btn-success px-4' onClick={addData} >Login</button>
                </form>
            </div>

            <div>
                <br />
                <FacebookLogin
                appId='601947984694888'
                // autoLoad={true}
                fields="name,email, picture"
                callback={()=> fbCallback()}
                // cssClass="my-facebook-button-class"
                icon="fa-facebook"
                style={{height:'15px'}}
                /> 

            
                <br />
                <GoogleLogin
                clientId="969414845856-4k1b1qirnfb9e00jb3r6dcgun9agonbn.apps.googleusercontent.com"
                // autoLoad={true}
                onFailure={responseGoogle} 
                onSuccess={responseGoogle}
                
                />
            </div>
            </Modal>
        </div>

  )
}
