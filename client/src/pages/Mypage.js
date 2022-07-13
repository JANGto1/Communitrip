import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const Mypages=styled.div`
margin: auto;
width: 600px;
height: 600px;
margin-top: 100px;
background: #f5cd79;
border: 1px solid black;
border-radius: 20px;
text-align: center;
`
export const PageButton =styled.div`
text-align: center;
margin-top: 20px;
`
export const Myinfobox = styled.div`
border: 1px solid black;
background-color: white;
margin-left: 100px;
margin-right: 100px;
width: 400px;
height: 50px;
line-height: 3rem;
font-weight: 600;
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
export const MypageBtn = styled.div`
text-align: center;
margin-top: 20px;
`
export const EditButton = styled.button`
margin-right: 100px;
width: 120px;
`
export const SignoutButton = styled.button`
width: 120px;
`
export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  margin-right: 25px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
`;
export const ModalsBtn = styled.button`
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
min-width: 100px;
max-width: 300px;
height: 20%;
overflow-y: auto;
border:solid;
position: fixed;
left: 50%;
top: 50%;
padding: 5px;
transform: translate(-50%, -50%);
z-index: 1011;
`;

export default function Mypage(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const openModalHandler = () => { 
    setIsOpen(!isOpen);
  };
  const openDeleteHandler = () => { 
    setIsDelete(!isDelete);
    setIsOpen(false);
  };
  console.log(props)
  const handleSignout =() =>{
    axios.delete(`${process.env.REACT_APP_API_URL}/users/${props.userinfo.id}`)
    .then((data) => {
      navigate('/')
    })
  }
  console.log(props)
  return (
    <div>
      <Mypages>
        <h1>Myinfo</h1>
        <br /><br /><br /><br />
        이름 :<Myinfobox > {props.userinfo.name}</Myinfobox>
        <br /><br />
        e-mail :<Myinfobox>
          {props.userinfo.email}
        </Myinfobox>
        
      </Mypages>
      <PageButton>
        <EditButton onClick={() => {
                navigate('/edit_profile');}}>
          회원정보 수정
        </EditButton>
        <SignoutButton onClick={openModalHandler}>
          회원 탈퇴
        </SignoutButton>
      </PageButton>
      {isOpen ? <ModalBackdrop onClick={openModalHandler}>
                    <ModalView onClick={(event) => {event.stopPropagation()}}>  
        <center>
        <br />
          <div>
          정말로 회원탈퇴를 하시겠습니까?
          </div>
          <MypageBtn>
          <ModalBtn  className="close-btn" onClick={() => {openDeleteHandler();}}>
            확인
          </ModalBtn>
          <ModalsBtn  className="close-btn" onClick={openModalHandler}>
            취소
          </ModalsBtn>
          </MypageBtn>
        </center>
                  </ModalView>
                  </ModalBackdrop> : null}
      {isDelete ? <ModalBackdrop onClick={openDeleteHandler}>
                    <ModalView onClick={(event) => {event.stopPropagation()}}>  
        <center>
        <br />
          <div>
          탈퇴가 완료되었습니다.
          </div>
          <MypageBtn>          
          <ModalBtn onClick={() => {openDeleteHandler();handleSignout();props.handleLogout()}}>
            확인
          </ModalBtn>
          </MypageBtn>
        </center>
                  </ModalView>
                  </ModalBackdrop> : null} 
    </div>
    
  );
}
