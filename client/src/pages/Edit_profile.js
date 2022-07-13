import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import styled from 'styled-components';
import  {checkPassword}  from './Signup/Validation'
axios.defaults.withCredentials = true;

const Errmessage = styled(Form.Text)`
color: red;
`
export const Editstyle=styled.div`
margin: auto;
width:60%;
height: 100%;
margin-top: 5%;
background: #f5cd79;
border: 1px solid black;
border-radius: 20px;
text-align: center;
`
export const Input = styled.input`
width:80%;
height:60%;
min-height:40px;
`
export const Emails = styled.div`
width:80%;
height:60%;
min-height:40px;
background-color: white;
border:1px solid black;
`
export default function EditProfile(props) {
  const [editInfo, setEditInfo] = useState({
    name: '',
    email: props.userinfo.email,
    pastpassword: props.userinfo.password,
    password: '',
    newpassword:'',
    samepassword:''
  });
  console.log(props.userinfo)
  console.log(editInfo)
  const handleInputValue = (key) => (e) => {
    setEditInfo({ ...editInfo, [key]: e.target.value });
  };
  const navigate= useNavigate();
  const [errName, setErrName] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errPasswords, setErrPasswords] = useState('');
  const [errPasswordChecked, setErrPasswordChecked] = useState('');
  
  useEffect(() => {
    const {
      name,
      pastpassword:curpastpassword,
      password: curpassword,
      newpassword: curnewpassword,
      samepassword,
    } = editInfo;

    if (!name) {
      setErrName('이름이 비어있습니다.');
    } else {
      setErrName('');
    }
    if (curpassword !== curpastpassword) {
      setErrPassword('이전비밀번호와 일치하지 않습니다.');
    } else {
      setErrPassword('');
    }
    if (!curnewpassword || !checkPassword(curnewpassword) || curnewpassword ===curpassword){
      setErrPasswords('비밀번호 8자리이상 및 특수기호 한개이상 포함해주세요.')
    } else{
      setErrPasswords('');
    }
    if (curnewpassword !== samepassword) {
      setErrPasswordChecked('새로운 비밀번호와 일치하지 않습니다..');
    } else {
      setErrPasswordChecked('');
    }
  }, [editInfo]);
  
  const handleEdit = () => {
    
    if(editInfo.name !=='' && editInfo.password !== '' && editInfo.newpassword !== '' && editInfo.samepassword !==''){
      axios.patch(`${process.env.REACT_APP_API_URL}/users/${props.userinfo.id}`,{
        name: editInfo.name,
        password: editInfo.newpassword,
      },{
        withCredentials: true
      }).then(props.userinfo.name = editInfo.name,props.userinfo.password = editInfo.password)   
    }
    navigate('/mypage')
  };
  //console.log(editInfo)
  return (
    <Editstyle>
      <center>
        <h3>회원정보 수정</h3>
        
        <div>이름</div><div><Input type="text" onChange={handleInputValue('name')} />
        </div>
        <Errmessage className="text_muted">
                {errName}
              </Errmessage>
              <br /><br />
        <div>e-mail</div><Emails>
          {props.userinfo.email}
        </Emails>
        
        <br />
        
        <div>현재 비밀번호</div><div><Input type="password" onChange={handleInputValue('password')} />
        </div>
        <Errmessage className="text_muted">
                {errPassword}
              </Errmessage>
        <br /><br />
        
        <div>비밀번호 수정 </div> <div><Input type="password" onChange={handleInputValue('newpassword')} />
        </div>
        <Errmessage className="text_muted">
                {errPasswords}
              </Errmessage>
        <br /><br />
        
        <div>비밀번호 수정확인</div>  <div><Input type="password" onChange={handleInputValue('samepassword')} />
        </div>
        <Errmessage className="text_muted">
                {errPasswordChecked}
              </Errmessage>
        <br /><br /><br /><br />
        <div>
        <Button variant="outline-primary" className='edit-button' onClick={handleEdit} >
          회원정보 수정하기
        </Button>
        <br /><br /><br />
        </div>
      </center>
    </Editstyle>
  )
}