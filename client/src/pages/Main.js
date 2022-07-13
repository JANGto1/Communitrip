import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';


export const Showpage = styled.div`
width : 100vw;
height : 91vh;
`
export const Buttons = styled.button`
background-color: skyblue;
cursor : pointer;
width : 100%;
height: 23vh;
`
export const Views1 =styled.div`
display: flex;
width : 100%;
height: 100vh;
border : solid 1px gray;
font-size: 30px ;
p {
  text-align: justify;
  
  
}
`
export const Views2 =styled.div`
display: flex;
width : 100%;
height: 100vh;
border : solid 1px none;
font-size: 30px;
`
export const Footers =styled.div`
background-color: gray;
width : 100%;
height: 7vh;
border : solid 1px black;
`
export const Img1 = styled.img`
width: 90%;
height: 100%;
margin-left: 20rem;
`
export const Img2 = styled.img`
width: 90%;
height: 100%;
margin-left: 20rem;
`


export default function Main() {
  const navigate = useNavigate();
  return (
   
      <Showpage>
      <center>
       <Views1 className='first_Main'>
        <p>여행지 정보를 공유할 곳을 찾으셨나요?</p>
        <div>
      <Img1 src="img/main1.png" />
    
      </div>
      </Views1>
      <Views2 >
      <div>
      <Img1 src="img/main2.png" />
      </div>
        <p>그렇다면 저희 Communitirp을 이용해 보세요! </p>
      </Views2>
      <Buttons  onClick={() => {
                navigate('/board');
              }}>
            게시판 페이지로 이동하기
          </Buttons>
      <Footers>
        <span>이명진 : </span>
        <span>박상문 :</span>
        <span>장태성 :</span>
        <div>Communitrip</div>
      </Footers>

        </center>

        </Showpage>
     
    
  );
}
