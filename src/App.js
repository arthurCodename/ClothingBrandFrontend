import './index.css'
import Header from './Header';
import styled from "styled-components"
import Shop from './Shop';
import Footer from './Footer';
import Cart from './Cart';
import { useEffect, useState } from 'react';
import LogInSignUp from './LogInSignUp';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";
import ItemPage from './ItemPage';
import {  Routes, Route } from "react-router-dom";
import AdminPanel from './AdminPanel';
import UpdateProduct from './UpdateProduct';
import CreateItem from './CreateItem';
import UserProfile from './UserProfile';
import ResetPassword from './ResetPassword';
import PasswordReset from './PasswordReset';


const AppStyles = styled.div`
font-family: "URW DIN", sans-serif;  
overflow-x: hidden;

.disable-scroll{
    
    overflow-y: hidden;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0px;
    filter: brightness(50%);
}

`




function App() {

  const [showCart, setShowCart] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [user, setUser] = useState({})

  const toggleCart = () => {
    setShowCart(!showCart)
  }

  const toggleLogin = () => {
    setShowLog(!showLog)
  }
  const toggleUpdate = () => {
    setShowUpdate(!showUpdate)
  }

  const toggleForgot = () => {
    setShowForgot(!showForgot)
  }

  const getForgot = () => {
    return showForgot
  }

  const toggleCreate = () => {
    setShowCreate(!showCreate)
  }
  const getCreate = () => {
    return showCreate;
  }
  const showLogged = () => {
    return isLogged
  }

  const getUser = () => {
    return user;
  }
  const getUpdate = () => {
    return showUpdate
  }
  

  const signOutUser = () => {
    setUser({})
    localStorage.removeItem('user')
    setIsLogged(false)
  }

  let props = {
    showcart: toggleCart,
    showLog: toggleLogin,
    showUpdate: toggleUpdate,
    showCreate: toggleCreate,
    isCreate: getCreate,
    isUpdate: getUpdate,
    isLogged: showLogged,
    userLogged: getUser,
    userLogOut: signOutUser,
    isForgot: getForgot,
    showForgot: toggleForgot
  }

  
  useEffect( () => {
    if (showCart || showLog || showUpdate || showCreate || showForgot){
      document.querySelector('.main-body').classList.add('disable-scroll');
    } else if(!showCart || !showLog || showUpdate || showCreate || showForgot){
    document.querySelector('.main-body').classList.remove('disable-scroll');
    }
    console.log(showUpdate)
    
  }, [showCart, showLog,showUpdate, showCreate, showForgot])

  

 useEffect(() => {
  const getStorage =  () => {
    window.addEventListener('storage', ()=> {
      try {
        setUser(jwtDecode(localStorage.getItem("user")))
        setIsLogged(true)
       console.log('hello')
      } catch (error) {
        console.log(error)
      }
       
   })
   if(localStorage.getItem("user")){
    try {
      setUser(jwtDecode(localStorage.getItem("user")))
      setIsLogged(true)
    } catch (error) {
      console.log(error)
    }
   }
    

}
getStorage()
 },[0])



  
  return (
    <AppStyles>
      
    <div className="App">
      <div className='main-body'>
      <Header {...props}/>
      
      <Routes>
        <Route path="/" element={<Shop {...props}/>}/>
        <Route path="/itemPage"  element={<ItemPage {...props}/>}/>
        <Route path="/admin" element={<AdminPanel {...props}/>}/>
        <Route path="/userProfile" element={<UserProfile {...props}/>}/>
        <Route path="/password-reset/:userId/:token" element={<PasswordReset {...props}/>}/>
        <Route path="/forgotPassword" element={<ResetPassword {...props}/>}/>
      </Routes>
      
      <Footer/>
      </div>
      {showCart ? <Cart  {...props}/> : null}
      {showLog ? <LogInSignUp {...props}/> : null}
      {showUpdate? <UpdateProduct {...props}/> : null}
      {showCreate ? <CreateItem {...props}/> : null}
      {showForgot ? <ResetPassword {...props}/> : null}
      

    </div>
    
    </AppStyles>
  );
}

export default App;
