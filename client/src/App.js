import React, { useEffect, useState } from 'react';
import './App.css';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Edit_profile from './pages/Edit_profile'
import Mypage from './pages/Mypage';
import Main from "./pages/Main";
import axios from 'axios';
import Board from './pages/Board';
import Boardpostform from './pages/Boardpostform';
import styled from 'styled-components';
import Myboard from './pages/Myboard';
import Create_post from './pages/Create_post';
import Post from './pages/Post';
import Commentsform from './pages/Commentsform'
import Editpost from './pages/Editpost'

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
export const Icon = styled.img`
width: 50px;
height: 50px;
`
export const LogImg = styled.img`
width: 3vw;
height: 5vh;
`
function App() {
    const navigate = useNavigate();
    const [postsByTags, setPostsByTags] = useState('');
    const [userinfo, setUserinfo] = useState({});
    const [postsinfo, setPostsinfo]=useState()
    const [tags, setTags] = useState()
    const [onepostinfo, setonepostinfo] =useState({});
    
  const isPosts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`).then((res) => {
      const test = res.data.data
      setPostsinfo(test)
    }).catch(error => {
      console.log(error)
    })
  }
  const isTags = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/tags`).then((res) => {
      const test = res.data.data
      setTags(test)
    }).catch(error => {
      console.log(error)
    })
  }

  const isAuthenticated = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/auth`).then((res) => {

      if (res.data.data.userInfo !== null) {
        const test = res.data.data.userInfo;
        setUserinfo(test);
        setIsLogin(true);
        
      }

    }).catch(error => {
      console.log(error);
    })

  };


  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleLogout = () => {

    axios.post(`/users/logout`).then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      navigate('/')
    },{
        withCredentials: true
      })
  }
  const [isLogin, setIsLogin] = useState(false);

  const [onLoginModal, setOnLoginModal] = useState(false)
  const onLoginModalHandler = () => {
    setOnLoginModal(!onLoginModal);
  }
  const [isLogout, setIsLogout] = useState(false);
  const openLogoutHandler = () => {
    setIsLogout(!isLogout);
  };


  useEffect(() => {

    isAuthenticated();
    isPosts();
    isTags();
  }, [onepostinfo]);

  return (
    <div className="App">
      <Navbar bg="light" variant="light" className="nav">
        <Container>
        <Navbar.Brand href="/"><LogImg src="img/log.png" />Communitrip</Navbar.Brand>
          <Nav className="nav justify-content-end" >
            <Nav.Link
              href="board"
              onClick={() => {
                navigate('/board');
              }}
            >
              게시판
            </Nav.Link>
            <Nav.Link
              href="myboard"
              onClick={() => {
                navigate("/myboard");
              }}
            >
              나의게시판
            </Nav.Link>
            <Nav.Link
              href="mypage"
              onClick={() => {
                //navigate("/mypage");
              }}
            >
              마이페이지
            </Nav.Link>
      {isLogin ===false ?             <Nav.Link
              onClick={() => {
                onLoginModalHandler()
                }}
              >
                Login
                {onLoginModal ? <Login /> :null}
              </Nav.Link> : <Nav.Link

onClick={() => {
  openLogoutHandler();
}}
>
Logout
</Nav.Link> }      

            </Nav>
          </Container>
        </Navbar>
        {isLogout ? <ModalBackdrop onClick={openLogoutHandler}>
                    <ModalView onClick={(event) => {event.stopPropagation()}}>  
        <center>
        <br />
        <div>
        로그아웃 하시겠습니까?
        </div>
        <MypageBtn>          
        <ModalBtn onClick={() => {openLogoutHandler();handleLogout()}}>
           확인
        </ModalBtn>
        </MypageBtn>
       </center>
                  </ModalView>
                  </ModalBackdrop> : null}              
<Routes>
    <Route path="/" element={<Main />}   userinfo = {userinfo} />
    <Route path="/mypage" element={<Mypage userinfo ={userinfo} handleLogout={handleLogout} />} />
    <Route path="/login" element={<Login handleResponseSuccess={handleResponseSuccess}/>} />
    <Route path="/edit_profile" element={<Edit_profile userinfo={userinfo} />} />
    <Route path="/board" element={<Board postsinfo={postsinfo} userinfo ={userinfo} onepostinfo={setonepostinfo} postsByTags={postsByTags} setPostsByTags={setPostsByTags}/>} />
    <Route path="/boardpostform" element={<Boardpostform  />} />
    <Route path="/create_post" element={<Create_post userinfo ={userinfo} tags={tags} />} />
    <Route path="/myboard" element={<Myboard userinfo={userinfo} onepostinfo={setonepostinfo} postsByTags={postsByTags} setPostsByTags={setPostsByTags} />} />
    <Route path="/post" element={<Post userinfo={userinfo}/>} />
    <Route path="/commentsform" element={<Commentsform />} />
    <Route path="/editpost" element={<Editpost userinfo={userinfo} tags={tags} />} />

</Routes>
</div>
    )
}

export default App;
