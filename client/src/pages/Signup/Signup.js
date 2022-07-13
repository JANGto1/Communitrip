import { Modal, Button, Form, Container} from 'react-bootstrap'
import axios from 'axios';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {checkUserEmail, checkPassword} from './Validation'
axios.defaults.withCredentials = true;

const Errmessage = styled(Form.Text)`
color: red;
`

const SignUpModal = styled(Modal)`
width: 40%;
min-width: 300px;
max-width: 500px;
height: 80%;
overflow-y: auto;
position: fixed;
left: 50%;
top: 50%;
padding: 5px;
transform: translate(-50%, -50%);

.SingupBtn {
  background-color: gray;
}
`

export default function Signup({show, onHide}) {

  const [signupInfo, setSignupInfo] = useState({
    userName: '',
    email: '',
    password: '',
    passwordChecked: '',
  });
  const [errUserName, setErrUserName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errPasswordChecked, setErrPasswordChecked] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate= useNavigate();

  const handleInputValue = (key, e) => {
    
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  useEffect(() => {
    const {
      userName,
      email: curEmail,
      password: curpassword,
      passwordChecked,
    } = signupInfo;

    if (!userName) {
      setErrUserName('이름이 비어있습니다.');
    } else {
      setErrUserName('');
    }
    if (!curEmail || !checkUserEmail(curEmail)) {
      setErrEmail('@, . 을 포함하여야 합니다.');
    } else {
      setErrEmail('');
    }
    if (!curpassword || !checkPassword(curpassword)) {
      setErrPassword('비밀번호 8자리이상 및 특수기호 한개이상 포함해주세요.');
    } else {
      setErrPassword('');
    }
    if (curpassword !== passwordChecked) {
      setErrPasswordChecked('비밀번호가 일치해야 합니다.');
    } else {
      setErrPasswordChecked('');
    }
  }, [signupInfo]);


  const handleSignup = () => {
    if(signupInfo.email !== '' && signupInfo.password !=='' && signupInfo.name !==''){
      axios.post(`${process.env.REACT_APP_API_URL}/users/signup`,{
        name:signupInfo.userName,
        email:signupInfo.email,
        password:signupInfo.password,
      },{
        withCredentials: true
      })
      
      setErrorMessage('')
      navigate('/')
    }else{
      setErrorMessage('모든 항목은 필수입니다')
    }
  };

  return (
    <div>
      <SignUpModal
        show= {show}
        onHide= {onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Container>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              회원가입
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                placeholder="이름을 입력해주세요."
                onChange={e => handleInputValue('userName', e)} 
              />
              <Errmessage className="text_muted">
                {errUserName}
              </Errmessage>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control 
                type="email"
                placeholder="이메일을 입력해주세요."
                onChange={e => handleInputValue('email',e)} 
              />
              <Errmessage className="text_muted">
                {errEmail}
              </Errmessage>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={e => handleInputValue('password', e)}  
              />
              <Errmessage className="text_muted">
                {errPassword}
              </Errmessage>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={e => handleInputValue('passwordChecked', e)} 
              />
              <Errmessage className="text_muted">
                {errPasswordChecked}
              </Errmessage>
            </Form.Group>
            <center>
            <Button 
              variant='primary'
              type='button' 
              className='SingupBtn' 
              onClick={() => {
                handleSignup()
                onHide()
              }}
            >
              회원가입
            </Button>
            <div>
            <Errmessage className="text_muted">
                {errorMessage}
              </Errmessage>
            </div>
            </center>
          </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" type="button">
              Submit
            </Button>
          </Modal.Footer>
        </Container>
      </SignUpModal>
    </div>
  );
}