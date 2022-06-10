import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import Signup from './Signup/Signup'
axios.defaults.withCredentials = true;

export const ModalContainer = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 5em;
`;
export const Input = styled.input`
width: 80%;
height:150%;
min-height: 40px;
`
export const ModalBackdrop = styled.div`
position: fixed;
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
background-color : none;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
`;

export const ModalView = styled.div`
background-color: white;
width: 40%;
min-width: 300px;
max-width: 600px;
height: 80%;
overflow-y: auto;
border:solid;
position: fixed;
left: 50%;
top: 50%;
padding: 5px;
transform: translate(-50%, -50%);
z-index: 1011;
`;

export default function Login ({ handleResponseSuccess }) {
  const [isOpen, setIsOpen] = useState(true);
  const [signUpModalOn, setSignUpModalOn] = useState(false);

  const openModalHandler = () => { 
    setIsOpen(!isOpen);
  };

  const navigate= useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    
    if(loginInfo.email !=='' && loginInfo.password !== ''){
      axios.post('http://localhost:8080/users/login',{
        email: loginInfo.email,
        password: loginInfo.password
      }).then( handleResponseSuccess )
      navigate('/')
      openModalHandler();
    }else{
      setErrorMessage('이메일과 비밀번호를 입력하세요')
    }
  };

  return (
    <div>

          {isOpen ? <ModalBackdrop onClick={openModalHandler}>
                    <ModalView onClick={(event) => {event.stopPropagation()}}>  
        <center>
        <h1>로그인 하기</h1>
        <br /><br />
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <div>이메일 입력</div>
            <Input type='email' onChange={handleInputValue('email')} />
          </div>
          <br />
          <div>
            <div>비밀번호 입력</div>
            <Input
              type='password'
              onChange={handleInputValue('password')}
            />
          </div>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <ModalBtn  className="close-btn" onClick={handleLogin}>
            로그인
          </ModalBtn>
          <br /><br />
          <div>
          <ModalBtn  className="close-btn" onClick={() => setSignUpModalOn(true)} >
            회원가입
          </ModalBtn>
          </div>
          <div className='alert-box'>{errorMessage}</div>
          <Signup show={signUpModalOn} onHide={() => setSignUpModalOn(false)} />
        </form>
      </center>         
                    </ModalView>
                  </ModalBackdrop> : null} 

    </div>
  );
};
