import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import Signup from './Signup/Signup';
import KaKaoLogin from 'react-kakao-login'

//import { REST_API_KEY, REDIRECT_URI} from './KakaoLogindata'

axios.defaults.withCredentials = true;
const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;
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

const responseKaKao = (res) => {
  console.log(res.profile.kakao_account)
  axios.post(`${process.env.REACT_APP_API_URL}/kakao/login`,{
        data: res.profile.kakao_account
        
      },{
        withCredentials: true
      }).then()
      alert('로그인 성공하였습니다')
      navigate('/')
      window.location.reload()
      openModalHandler();
};

  const [isOpen, setIsOpen] = useState(true);
  const [signUpModalOn, setSignUpModalOn] = useState(false);

  const openModalHandler = () => { 
    setIsOpen(!isOpen);
  };

 


  const openSignUpHandler = () => {
    setSignUpModalOn(!signUpModalOn)
  }


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
      axios.post(`${process.env.REACT_APP_API_URL}/users/login`,{
        email: loginInfo.email,
        password: loginInfo.password
      },{
        withCredentials: true
      }).then( handleResponseSuccess )
      navigate('/')
      window.location.reload();
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
          <br /><br /><br /><br /><br /><br /><br /><br />

    <KaKaoBtn
    //styled component 통해 style을 입혀 줄 예정 
                jsKey={process.env.REACT_APP_KAKAOINIT}
    //카카오에서 할당받은 jsKey를 입력
                buttonText='카카오 계정으로 로그인'
    //로그인 버튼의 text를 입력
    onSuccess={responseKaKao}
    //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장 
                getProfile={true}
              />
            <br /><br />
          <ModalBtn  onClick={handleLogin}>
            로그인
          </ModalBtn>
          <br /><br />
          <div>
          <ModalBtn  className="close-btn" onClick={openSignUpHandler} >
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
