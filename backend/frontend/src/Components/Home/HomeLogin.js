import React,{useState} from 'react'
import Modal from 'react-modal'
import LogIn from '../Common/Login'
import Signup from '../Common/Signup'
import '../../Styles/Header.css'

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

  Modal.setAppElement('#root');

export default function HomeLogin() {
    const [showLog, setShowLog] = useState(false)

    const [show, setShow] = useState(false)

    const [isLogoutModelOpen, setIsLogoutModalOpen] = useState(false)
//  const [auth,setAuth]=useState(null)

//  setAuth(localStorage.getItem('User'))
let uname='';
let umail='';
  const auth=localStorage.getItem('User')
  let temp=JSON.parse(auth)
  if(temp){
    uname=temp.name;
    umail=temp.email;
  }
  console.log(auth)
   const logout=()=>localStorage.clear('User');

  return (

    <div>
        <div className="btn-group login-block" >
                { auth ? 
            // <div><span style={{color:"white"}}>Welcome </span><button className="createAcc-p" onClick={()=>logout()}>Logout</button></div>
            <button className="logout" onClick={() => setIsLogoutModalOpen(true)}>Logout </button>
                :<span style={{width:'30vw'}}>
                <button className='login' onClick={()=> setShowLog(true)} >LogIn</button>
                <button className='signUp' onClick={()=> setShow(true)}>Create An Account</button>

                </span>}
        </div>

        <LogIn onClose={() => setShowLog(false)} show={showLog}/>

        <Signup onClose={() => setShow(false)} show={show}/>

        <Modal isOpen={isLogoutModelOpen}
        style={customStyles} >
       <div>
       {/* <span className="logIn">Profile</span> */}
        <button className='btn btn-danger' style={{float:'right',width:'40px'}} onClick={() => setIsLogoutModalOpen(false)}>
                &times;
          </button></div><br/>
         
          <br/>
         
       <div>
       {/* <div className="logoutText2">{temp.name}</div><br/>
       <div className="logoutText2">{temp.email}</div><br/> */}
       <div className="logoutText1">Welcome {uname.toUpperCase()}</div>
       <div className="logoutText1">id: <span style={{fontWeight:"200"}}>{umail}</span> </div>
      <br/>
       <br/>
       <span>Do you want to logout??</span>
        <button className='logButton btn btn-secondary' style={{marginLeft:"10px"}} onClick={()=>{logout(); setIsLogoutModalOpen(false);}}>LogOut</button>
        </div>
      </Modal>
    </div>
  )
}
